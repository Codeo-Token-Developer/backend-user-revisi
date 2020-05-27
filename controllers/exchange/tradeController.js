const Account = require('../../models/AccountSide/account.model');
const TradeHistory = require('../../models/exchange/tradeHistory');
const LimitTrade = require('../../models/exchange/limitTrade');

class TradeController {
  
    static readAllLimit(req,res,next) {
        let coin = req.params.coin;
        LimitTrade.find({currency: coin}).sort({createdAt: 'asc'})
            .then(limitTrade => {
                res.status(200).json({limitTrade, status: 200})
            })
            .catch(next);
    };

    static readMyLimit(req,res,next) {  
        let user = req.decoded.id;
        LimitTrade.find({user}).sort({createdAt: 'asc'})
            .then(myLimitTrade => {
                res.status(200).json({myLimitTrade, status: 200})
            })
            .catch(next)
    };

    static createLimitOrderBuy(req,res,next) {
        let user = req.decoded.id;
        let { amount, price, order_type, currency } = req.body;
        let totalPrice = amount * price;
        Account.findOne({user})
            .then(userAccount => {
                if (userAccount.balance > totalPrice) {
                    return  LimitTrade.findOne({user, order_type, currency})
                    .then(result => {
                        if (result) {
                            let allPrices = result.prices;
                            allPrices.push(price);
                            let totalAmount = result.amounts + Number(amount);
                            req.allPrices = allPrices;
                            req.totalAmount = totalAmount
                            let totalPrices = 0;
                            allPrices.forEach(item => {
                                totalPrices += item;
                            })
                            let averagePrice = (totalPrices/allPrices.length).toFixed(2);
                            LimitTrade.updateOne({_id: result.id}, {prices: allPrices, amounts: totalAmount, average_price: averagePrice}, {omitUndefined: true})
                                .then(() => {
                                    res.status(200).json({message: 'Your buy limit order has been executed'})
                                })
                                .catch(next)
                        }else {
                            return LimitTrade.create({average_price: price,amounts: amount, prices: [price], average: price, currency, order_type, user})
                        }
                    })
                    .then(trade => {
                        res.status(202).json({message: 'Your limit order has been executed', status: 202})
                    })
                }else {
                    return next({message: "You dont have enought balance, please topup first"})
                }
            })
            
            .catch(next);
    };

    static createLimitOrderSell(req,res,next) {
        let user = req.decoded.id;
        let { amount, price, order_type, currency } = req.body;
        let totalCoin = 0;
        let limitSellTrade;
        let allPrices;
        let isFind;
        let objectText = "";
        if (currency === "BTC") {
            objectText = "BTC_coin"
        }else if (currency === 'TRX') {
            objectText = "TRX_coin"
        }else if (currency === 'ETH') {
            objectText = "ETH_coin"
        }else if (currency === 'BNB') {
            objectText = "BNB_coin"
        }else if (currency === 'CODEO') {
            objectText = "CODEO_coin"
        }else {
            next({message: "Coin not available"})
        }

        LimitTrade.findOne({user, order_type, currency})
            .then(sellTrade => {
                if (sellTrade) {
                    limitSellTrade = sellTrade; 
                    allPrices = limitSellTrade.prices;
                    allPrices.push(price);
                    totalCoin = sellTrade.amounts + Number(amount);
                    isFind = true;
                    return Account.findOne({user})
                }else {
                    isFind = false;
                    return Account.findOne({user})
                }
            })
            .then(userAccount => {
              if (isFind) {
                if (userAccount[objectText] > totalCoin) {
                    let totalPrice = 0;
                    let average_price = 0;
                    allPrices.forEach(item => {
                        totalPrice += item;
                    })
                    average_price = (totalPrice / allPrices.length).toFixed(2);
                    return LimitTrade.updateOne({_id: limitSellTrade.id}, {average_price: average_price, amounts: totalCoin, prices: allPrices}, {omitUndefined: true})
                        .then(() => {
                            res.status(200).json({message: 'Your sell limit order has been executed'})
                        })
                }else {
                    next({message: `Your bitcoin balance not enough`})
                }
              }else {
                if (userAccount[objectText] < amount) {
                    next({message: `Your ${currency} balance not enough`})
                }else {
                    return LimitTrade.create({amounts: amount, average_price: price, prices: [price], currency, user, order_type})
                        .then(trade => {
                            res.status(202).json({message: "Your sell limit order has been executed"})
                        })
                }
              }
            })
            .catch(next);
    }

    static readAllOrder(req,res,next) {
        TradeHistory.find({}).sort({createdAt: 'asc'})
            .then(trades => {
                res.status(200).json({trades, status: 200})
            })
            .catch(next);
    };

    static readMyOrder(req,res,next) {
        let user = req.decoded.id;
        TradeHistory.find({user})
            .then(result => {
                res.status(200).json({mytrdes: result, status: 200})
            })
            .catch(next)
    };

    static createOrder(req,res,next) {
        let user = req.decoded.id;
        let { pair,  order_type, side, price, filled_all, status } = req.body;
        TradeHistory.create({pair, order_type, side, price, filled_all, status, user })
            .then(trade => {
                res.status(200).json({message: 'Your order has been executed'});
            })
            .catch(next)
    };

    static deleteAmountLimit(req,res,next) {
        let limitTradeId = req.params.tradeId;
        LimitTrade.deleteOne({_id: limitTradeId})
            .then(() => {
                res.status(201).json({message: "Order has been deleted"})
            })
            .catch(next);
    };
    
    static createBuyOrder(req,res,next) {
        let { pair, order_type, side, price, filled_all, status } = req.body;
        
    };

    static createSellOrder(req,res,next) {
       
    }

};

module.exports = TradeController;