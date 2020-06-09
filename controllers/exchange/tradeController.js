const Account = require('../../models/AccountSide/account.model');
const TradeHistory = require('../../models/exchange/tradeHistory');
const LimitTrade = require('../../models/exchange/limitTrade');

class TradeController {

    static readAllLimit(req,res,next) {
        let coin = req.params.coin;
        LimitTrade.find({currency: coin}).sort({updatedAt: 'asc'})
            .then(trades => {
                res.status(200).json({limitTrades: trades, status: 200})
            })
            .catch(next)
    };

    static readMyLimit(req,res,next) {
        let coin = req.params.coin;
        let user = req.decoded.id;
        LimitTrade.find({currency: coin, user})
            .then(myTrades => {
                res.status(200).json({limitTrades: myTrades, status: 200})
            })
            .catch(next)
    };

    static createBuyOrder(req,res,next) {
        let Io = req.Io;
        let user = req.decoded.id;
        let { amount, price, order_type, currency } = req.body;
        let userBalance;

        Account.findOne({user})
            .then(account => {
                if (account) {
                    userBalance = account.balance;
                    return LimitTrade.findOne({currency, order_type, user})
                    .then(userTrade => {
                        console.log(userTrade);
                        if (userTrade) {
                            let totalAmount = userTrade.amounts + Number(amount);
                            let allPrices = userTrade.prices;
                            allPrices.push(Number(price));
                            let totalPrices = 0;
                            allPrices.forEach(item => {
                                totalPrices += item
                            })
                            let newAverage_price = totalPrices / allPrices.length
                            if (newAverage_price > userBalance) {
                                next({message: `Your balance is not enought`})
                            }else {
                                let total_btc_price = newAverage_price * totalAmount;
                                return LimitTrade.updateOne({_id: userTrade.id}, {total: total_btc_price.toFixed(2),average_price: newAverage_price.toFixed(2), prices: allPrices, amount: totalAmount}, {omitUndefined: true, new: true})
                                .then(() => {
                                    return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'})
                                    .then(trades => {
                                        Io.emit(`${order_type}-limit`, trades)
                                        res.status(202).json({limitTrade: trades, status: 202});
                                    })
                                })
                            }
                        }else {
                            req.userBalance = userBalance;
                            next();
                            return
                        }
                    })
                }else {
                    next({message: "Please make account first"})
                }
            })
            .catch(next)
    };

    static createBuyOrderStep2(req,res,next) {
        let Io = req.Io;
        let user = req.decoded.id;
        let { amount, price, order_type, currency } = req.body;
        let userBalance = req.userBalance;
        let totalPrice = Number(amount) * Number(price);
        if (totalPrice > userBalance) {
            next({message: 'Your balance is not enought'})
        }else {
            console.log("masuk step 2")
            LimitTrade.create({total: totalPrice.toFixed(2) ,amounts: Number(amount), prices: [Number(price)], order_type, currency, average_price: Number(price), user})
                .then(trade => {
                 return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'}).exec(function(err, docs) {
                     if (err) {
                         next(err)
                     }else {
                        Io.emit(`${order_type}-limit`, docs)
                        res.status(200).json({limitTrade: docs, status: 200})
                     }
                 });
                })
                .catch(next)
        };
        
    };

    static createSellOrder(req,res,next) {
        let Io = req.Io;
        let user = req.decoded.id;
        let { amount, price, order_type, currency } = req.body;
        Account.findOne({user})
            .then(account => {
                if (account) {
                    
                }
            })
            .catch(next)
    };

    static createSellOrderStep2(req,res,next) {

    };
};


// class TradeController {
  
//     static readAllLimit(req,res,next) {
//         let coin = req.params.coin;
//         let currency;
//         if (coin === 'btc') {
//             currency = 'BTC'
//         }else if (coin === 'eth') {
//             currency = 'ETH'
//         }else if (coin === 'bnb') {
//             currency = 'BNB'
//         }else if (coin === 'TRX') {
//             currency = 'TRX'
//         }else if (coin === 'codeo') {
//             currency = 'CODEO'
//         }else if (coin === 'ltc') {
//             currency = 'LTC'
//         }else {
//             next({message: 'Coin not available'})
//         }
//         LimitTrade.find({currency}).sort({createdAt: 'asc'})
//             .then(limitTrade => {
//                 res.status(200).json({limitTrade, status: 200})
//             })
//             .catch(next);
//     };

//     static readMyLimit(req,res,next) {  
//         let user = req.decoded.id;
//         LimitTrade.find({user}).sort({createdAt: 'asc'})
//             .then(myLimitTrade => {
//                 res.status(200).json({myLimitTrade, status: 200})
//             })
//             .catch(next)
//     };

//     static createLimitOrderBuy(req,res,next) {

//         let Io = req.Io;
//         let user = req.decoded.id;
//         let { amount, price, order_type, currency } = req.body;
//         let totalPrice = amount * price;
//         let objectText;
//         let createTrade;

//         console.log(req.body)

//         if (currency === "BTC") {
//             objectText = "BTC_coin"
//         }else if (currency === 'TRX') {
//             objectText = "TRX_coin"
//         }else if (currency === 'ETH') {
//             objectText = "ETH_coin"
//         }else if (currency === 'BNB') {
//             objectText = "BNB_coin"
//         }else if (currency === 'CODEO') {
//             objectText = "CODEO_coin"
//         }else if (currency === 'LTC') {
//             objectText = "LTC_coin"
//         }else {
//             next({message: "Coin not available"})
//         }

//         Account.findOne({user})
//             .then(userAccount => {
                
//                 if (userAccount.balance > totalPrice) {
//                     return  LimitTrade.findOne({user, order_type, currency})
//                     .then(result => {
//                         if (result) {
//                             let allPrices = result.prices;
//                             allPrices.push(price);
//                             let totalAmount = result.amounts + Number(amount);
//                             req.allPrices = allPrices;
//                             req.totalAmount = totalAmount;
//                             let totalPrices = 0;
//                             allPrices.forEach(item => {
//                                 totalPrices += item;
//                             })
//                             let averagePrice = (totalPrices/allPrices.length).toFixed(2);
//                             return LimitTrade.findOneAndUpdate({_id: result.id}, {prices: allPrices, amounts: totalAmount, average_price: averagePrice}, {omitUndefined: true, new: true})
                               
//                         }else {
//                             return LimitTrade.create({average_price: price,amounts: amount, prices: [price], average: price, currency, order_type, user})
//                         }
//                     })
//                     .then((trade) => {
//                         console.log(trade)
//                         createTrade = trade
//                         return LimitTrade.find({currency, order_type: 'buy'})
//                     })
//                     .then(allTrade => {
//                         let newTrade = [createTrade];
//                         allTrade.forEach(item => {
//                             console.log(item.id)
//                             if (item.id != createTrade.id) {
//                                 newTrade.push(item)
//                             }
//                         })
//                         console.log(newTrade)
//                         Io.emit('buy-limit', {currency, newTrade});
                
//                         res.status(200).json({message: 'Your buy limit order has been executed'})
//                     })
//                     .catch(next)
//                 }else {
//                     return next({message: "You dont have enought balance, please topup first"})
//                 }
//             })
            
//             .catch(next);
//     };

//     static createLimitOrderSell(req,res,next) {
//         let Io = req.Io;
//         let user = req.decoded.id;
//         let { amount, price, order_type, currency } = req.body;
//         let totalCoin = 0;
//         let limitSellTrade;
//         let allPrices;
//         let isFind;
//         let objectText = "";
//         if (currency === "BTC") {
//             objectText = "BTC_coin"
//         }else if (currency === 'TRX') {
//             objectText = "TRX_coin"
//         }else if (currency === 'ETH') {
//             objectText = "ETH_coin"
//         }else if (currency === 'BNB') {
//             objectText = "BNB_coin"
//         }else if (currency === 'CODEO') {
//             objectText = "CODEO_coin"
//         }else if (currency === 'LTC') {
//             objectText = "LTC_coin"
//         }else {
//             next({message: "Coin not available"})
//         }

//         LimitTrade.findOne({user, order_type, currency})
//             .then(sellTrade => {
//                 if (sellTrade) {
//                     limitSellTrade = sellTrade; 
//                     allPrices = limitSellTrade.prices;
//                     allPrices.push(price);
//                     totalCoin = sellTrade.amounts + Number(amount);
//                     isFind = true;
//                     return Account.findOne({user})
//                 }else {
//                     isFind = false;
//                     return Account.findOne({user})
//                 }
//             })
//             .then(userAccount => {
//               if (isFind) {
//                 if (userAccount[objectText] > totalCoin) {
//                     let totalPrice = 0;
//                     let average_price = 0;
//                     allPrices.forEach(item => {
//                         totalPrice += item;
//                     })
//                     average_price = (totalPrice / allPrices.length).toFixed(2);
//                     return LimitTrade.findOneAndUpdate({_id: limitSellTrade.id}, {average_price: average_price, amounts: totalCoin, prices: allPrices}, {omitUndefined: true, new: true})
//                         .then((trade) => {
//                             Io.emit('sell-limit', trade)
//                             res.status(200).json({message: 'Your sell limit order has been executed'})
//                         })
//                 }else {
//                     next({message: `Your bitcoin balance not enough`})
//                 }
//               }else {
//                 if (userAccount[objectText] < amount) {
//                     next({message: `Your ${currency} balance not enough`})
//                 }else {
//                     return LimitTrade.create({amounts: amount, average_price: price, prices: [price], currency, user, order_type})
//                         .then(trade => {
//                             Io.emit('sell-limit', trade)
//                             res.status(202).json({message: "Your sell limit order has been executed"})
//                         })
//                         .catch(next)
//                 }
//               }
//             })
//             .catch(next);
//     }

//     static readAllOrder(req,res,next) {
//         TradeHistory.find({}).sort({createdAt: 'asc'})
//             .then(trades => {
//                 res.status(200).json({trades, status: 200})
//             })
//             .catch(next);
//     };

//     static readMyOrder(req,res,next) {
//         let user = req.decoded.id;
//         TradeHistory.find({user})
//             .then(result => {
//                 res.status(200).json({mytrdes: result, status: 200})
//             })
//             .catch(next)
//     };

//     static createOrder(req,res,next) {
//         let user = req.decoded.id;
//         let { pair,  order_type, side, price, filled_all, status } = req.body;
//         TradeHistory.create({pair, order_type, side, price, filled_all, status, user })
//             .then(trade => {
//                 res.status(200).json({message: 'Your order has been executed'});
//             })
//             .catch(next)
//     };

//     static deleteAmountLimit(req,res,next) {
//         let limitTradeId = req.params.tradeId;
//         LimitTrade.deleteOne({_id: limitTradeId})
//             .then(() => {
//                 res.status(201).json({message: "Order has been deleted"})
//             })
//             .catch(next);
//     };
    
//     static createOrder(req,res,next) {
//         let { pair, order_type, side, price, filled_all, status } = req.body;
//         TradeHistory.create({pair, order_type, side, price, filled_all, status})
//             .then(trade => {
//                 console.log(trade)
//                 res.status(202).json({trade, status: 202})
//             })
//             .catch(next)
//     };

//     static createSellOrder(req,res,next) {
//         let { pair, order_type, side, price, filled_all, status } = req.body;
//         TradeHistory.create({pair, order_type, price, filled_all, status, side})
//             .then(trade => {
//                 res.status(202).json({trade, status: 202})
//             })
//             .catch(next);
//     };

// };

module.exports = TradeController;