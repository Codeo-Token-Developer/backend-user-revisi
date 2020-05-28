const Trade = require('../../models/exchange/Trade');
const Account = require('../../models/AccountSide/account.model')

class TradeController {

    static readAll(req,res,next) {
        Trade.find({})
            .then(trades => {
                res.status(200).json({trades, status: 200})
            })
            .catch(next)
    };

    static readOrder(req,res,next) {
        let order = req.params.order;
        let coin = req.params.coin
        Trade.find({order_type: order, coin})
            .then(trades => {
                res.status(200).json({trades, status: 200})
            })
            .catch(next)
    };

    static createOrder(req,res,next) {
        let user = req.decoded.id;
        let { order_type, price, amount, coin,  } = req.body;
        Trade.findOne({user, order_type, coin})
            .then(userTrade => {
                if (userTrade) {
                    req.userTrade = userTrade;
                    let allPrices = userTrade.prices;
                    let totalAmount = userTrade.total_amount + Number(amount)
                    allPrices.push(Number(price));
                    req.totalAmount = totalAmount;
                    req.allPrices = allPrices;
                    next();
                }else {
                   return Trade.create({order_type, prices:[price], total_amount: amount, average_price: price, coin: coin, user})
                }
            })
            .then(newTrade => {
                return Account.updateOne({user: req.decoded.id}, {balance: req.lastBalance})
            })
            .then(() => {
                res.status(201).json({message: 'Your order has been executed'});
            })
            .catch(next);
    };

    static UpdateOrder(req,res,next) {
        let userTrade = req.userTrade;
        let allPrices = req.allPrices;
        let totalAmount = req.totalAmount;
        TradeController.getAverage(allPrices)
            .then(average => {
                return Trade.updateOne({_id: userTrade.id}, {prices: allPrices, total_amount: totalAmount, average_price: average}, {omitUndefined: true})
            })
            .then(() => {
                return Account.updateOne({user: req.decoded.id}, {balance: req.lastBalance})
            })
            .then(() => {
                return res.status(200).json({message: 'Your order has been executed', status: 200});
            })
            .catch(next);
    };

    static getAverage(priceArray) {
        return new Promise((result,reject) => {
            let totalPrice = 0;
            priceArray.forEach(item => {
                totalPrice += item;
            });
            let averagePrice = totalPrice / priceArray.length;
            result(averagePrice);
        })
    };

    static balanceCheck(req,res,next) {
        let user = req.decoded.id;
        let { amount, price } = req.body;
        let totalPrice = Number(amount) * price;
        Account.findOne({user})
            .then(myAccount => {
                if (myAccount) {
                    if (myAccount.balance < totalPrice) {
                        next({message: 'You dont have enough balance, please topup first'})
                    }else {
                        let lastBalance = myAccount.balance - totalPrice;
                        req.lastBalance = lastBalance;
                        next();
                    }
                }else {
                    next({message: 'You must have account first'})
                }
            })
            .catch(next);
    };

    static sellOrder(req,res,next) {
        let remainCoin = req.remainCoin;
        let user = req.decoded.id;
        let { amount, order_type, price, coin } = req.body;
        Trade.findOne({user, order_type})
            .then(myTrade => {
                if (myTrade) {
                    let allPrices = myTrade.prices;
                    allPrices.push(Number(price));
                    let totalAmount = myTrade.total_amount + Number(amount);
                    req.totalAmount = totalAmount;
                    req.allPrices = allPrices;
                    req.myTrade = myTrade;
                    next();
                }else {
                    return Trade.create({order_type, prices:[price], total_amount: amount, average_price: price, coin: coin, user})
                }
            })
            .then(newTrade => {
               if (remainCoin > 0) {
                return Trade.updateOne({user, order_type: 'buy', coin}, {total_amount: remainCoin})
               }else {
                   return Trade.deleteOne({user, order_type: 'buy', coin})
               }
            })
            .then(() => {
                res.status(202).json({message: 'Your order has been executed'})
            })
            .catch(next)
    };

    static updateSellOrder(req,res,next) {
        let remainCoin = req.remainCoin;
        let buyTrade = req.buyTrade;
        let allPrices = req.allPrices;
        let user = req.decoded.id;
        let totalAmount = req.totalAmount;
        let { coin } = req.body;
        TradeController.getAverage(allPrices)
            .then(avg => {
                return Trade.updateOne({user, order_type: 'sell', coin}, {total_amount: totalAmount, average_price: avg, prices: allPrices}, {omitUndefined: true})
            })
            .then(() => {
                if (remainCoin > 0) {
                    return Trade.updateOne({_id: buyTrade.id}, {total_amount: remainCoin}, {omitUndefined: true})
                }else {
                    return Trade.deleteOne({_id: buyTrade.id})
                }
            })
            .then(() => {
                res.status(202).json({message: 'You order has been executed', status: 202})
            })
        
    }

    static checkOrderType(req,res,next) {
        let { amount, coin } = req.body;
        let user = req.decoded.id;
        Trade.findOne({user, order_type: 'buy', coin})
            .then(trade => {
                if (trade) {
                    if (trade.total_amount < Number(amount)) {
                        next({message: `You dont have enough amount`})
                    }else {
                        req.buyTrade = trade;
                        req.remainCoin = trade.total_amount - Number(amount)
                        next();
                    }
                }else {
                    next({message: `You dont have ${coin}`})
                }
            })
    }

};

module.exports = TradeController;