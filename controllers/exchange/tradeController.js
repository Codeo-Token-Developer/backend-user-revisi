const Account = require('../../models/AccountSide/account.model');
const TradeHistory = require('../../models/exchange/tradeHistory');
const LimitTrade = require('../../models/exchange/limitTrade');

class TradeController {

    static readAllLimit(req,res,next) {
        let coin = req.params.coin;
        LimitTrade.find({currency: coin}).sort({updatedAt: 'desc'})
            .then(trades => {
                res.status(200).json({limitTrades: trades, status: 200})
            })
            .catch(next)
    };

    static readAllHistory(req,res,next) {
        let pair = req.params.pair;
        TradeHistory.find({pair}).sort({updatedAt: 'desc'})
            .then(trades => {
                res.status(200).json({trades, status: 200})
            })
            .catch(next)
    };

    static readMyHistory(req,res,next) {
        let pair = req.params.pair;
        let user = req.decoded.id;
        TradeHistory.find({user})
            .then(trades => {
                res.status(200).json({trades, status: 200})
            })
            .catch(next)
    }

    static readMyLimit(req,res,next) {
        let coin = req.params.coin;
        let user = req.decoded.id;
        LimitTrade.find({currency: coin, user})
            .then(myTrades => {
                res.status(200).json({limitTrades: myTrades, status: 200})
            })
            .catch(next)
    };

    static createLimitBuy(req,res,next) {
        
        let Io = req.Io;
        let { amount, price, order_type, currency } = req.body;
        let user = req.decoded.id;
        let userBalance;
        let accountId;
        Account.findOne({user})
            .then(userAccount => {
                console.log(userAccount)
                if (userAccount) {
                    let totalPrice = Number(amount) * Number(price);
                    accountId = userAccount.id;
                    if (userAccount.balance > totalPrice) { 
                    userBalance = userAccount.balance - totalPrice;
                    return LimitTrade.create({amount, price, order_type, currency, user, total: totalPrice})
                        .then(trade => {
                            return Account.updateOne({_id: accountId}, {balance: userBalance}, {omitUndefined: true})
                                .then(() => {
                                    return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'})
                                        .then(trades => {
                                            Io.emit(`${order_type}-limit`, {trades, userBalance: userBalance.toFixed(2), currency})
                                            res.status(202).json({message: "Your limit order has been executed"})
                                        })
                                })
                        })
                    }
                }else {
                    next({message: 'You dont have account, please create first'})
                }
            })
            .catch(next);
    };

    static createLimitSell(req,res,next) {
        let Io = req.Io;
        let { amount, price, order_type, currency } = req.body;
        let user = req.decoded.id;
        let coinBalance;
        let objectText;
        let accountId;
        if (currency === 'btc') {
            objectText = 'BTC_coin'
        }else if (currency === 'eth') {
            objectText = 'ETH_coin'
        }else if (currency === 'trx') {
            objectText = 'TRX_coin'
        }else if (currency === 'bnb') {
            objectText = 'BNB_coin'
        }else if (currency === 'codeo') {
            objectText = 'CODEO_coin'
        }else if (currency === 'ltc') {
            objectText = "LTC_coin"
        };
        Account.findOne({user})
            .then(userAccount => {
                if (userAccount) {
                    accountId = userAccount.id;
                    if (userAccount[objectText]) {
                        coinBalance = userAccount[objectText] - Number(amount)
                        if (coinBalance > amount) {
                            let totalPrice = Number(amount) * Number(price)
                            return LimitTrade.create({amount, price, currency, total: totalPrice, order_type, user})
                                .then(trade => {
                                    return Account.updateOne({ _id:  accountId}, {[objectText]: coinBalance}, {omitUndefined: true})
                                        .then(() => {
                                            return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'})
                                                .then(trades => {
                                                    Io.emit({trades, coinBalance, })
                                                    res.status(202).json({message: 'Your limit order has been executed'})
                                                })
                                        })
                                })
                        }else {
                            next({message: `You dont have enough coin`})
                        }
                    }else {
                        next({message: 'You dont have enough coin'})
                    }
                }else {
                    next({message: 'You dont have account, please create first'})
                }
            })
            .catch(next);
    };

    static createBuyMarketHistory(req,res,next) {
        let Io = req.Io;
        let { amount, price, order_type, currency, pair } = req.body;
        let user = req.decoded.id;
        let total = Number(price) * Number (amount);
        let userBalance;
        let fixedBalance;
        let accountId;
        Account.findOne({user})
            .then(userAccount => {
                if (userAccount) {
                    accountId = userAccount;
                    userBalance = userAccount.balance;
                    if (userBalance < total) {
                        next({message: `Your balance not enough`})
                    }else {
                        fixedBalance = userBalance - total;
                        return TradeHistory.create({amount, price, order_type, pair, currency, total, user})
                            .then(trade => {
                                return TradeHistory.find({}).sort({updatedAt: 'desc'})
                                    .then(trades => {
                                        Io.emit(`${pair}-order`, {trades, pair, fixedBalance})
                                        return Account.updateOne({_id: accountId}, {balance: fixedBalance}, {omitUndefined: true})
                                            .then(() => {
                                                res.status(202).json({message: `Your order already executed`})
                                            })
                                    })
                            })
                    }
                }else {
                    next({message: `You dont have account, please create account first`})
                }
            })
    };

    static createSellMarketHistory(req,res,next) {
        let Io = req.Io;
        let { amount, price, order_type, currency, pair } = req.body;
        let user = req.decoded.id;
        let total = Number(price) * Number (amount);
        let coinBalance;
        let accountId;
        let objectText;
        if (currency === 'btc') {
            objectText = 'BTC_coin'
        }else if (currency === 'eth') {
            objectText = 'ETH_coin'
        }else if (currency === 'trx') {
            objectText = 'TRX_coin'
        }else if (currency === 'bnb') {
            objectText = 'BNB_coin'
        }else if (currency === 'codeo') {
            objectText = 'CODEO_coin'
        }else if (currency === 'ltc') {
            objectText = "LTC_coin"
        };
        Account.findOne({user})
            .then(userAccount => {
                if (userAccount) {
                    accountId = userAccount.id;
                    coinBalance = userAccount[objectText];
                    console.log(coinBalance);
                    let fixedBalance = coinBalance - Number(amount)
                    if ( amount < coinBalance ) {
                        TradeHistory.create({amount, price, order_type, pair, user, total})
                            .then(trade => {
                                return TradeHistory.find({})
                                    .then(trades => {
                                        Io.emit(`${pair}-order`, {trades, pair, coinBalance})
                                        return Account.updateOne({_id: accountId}, {[objectText]: fixedBalance}, {omitUndefined: true})
                                            .then(() => {
                                                res.status(202).json({message: `Your order already executed`, status: 202})
                                            })
                                    })
                            })
                    }else {
                        next({message: `You dont have enough balance`})
                    }
                }else {
                    next({message: `You dont have account, please create acctoun first`})
                }
            })
            .catch(next)
    }

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
                                next({message: `Your balance is not enough`})
                            }else {
                                let total_coin_price = newAverage_price * totalAmount;
                                return LimitTrade.updateOne({_id: userTrade.id}, {total: total_coin_price.toFixed(2),average_price: newAverage_price.toFixed(2), prices: allPrices, amounts: totalAmount}, {omitUndefined: true})
                                .then(() => {
                                    return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'})
                                    .then(trades => {
                                        Io.emit(`${order_type}-limit`, {trades, currency})
                                        res.status(202).json({message: "Your order has been executed", status: 202});
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
            next({message: 'Your balance is not enough'})
        }else {
            LimitTrade.create({total: totalPrice.toFixed(2) ,amounts: Number(amount), prices: [Number(price)], order_type, currency, average_price: Number(price), user})
                .then(trade => {
                 return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'}).exec(function(err, docs) {
                     if (err) {
                         next(err)
                     }else {
                        Io.emit(`${order_type}-limit`, Io.emit(`${order_type}-limit`, {trades: docs, currency}))
                        res.status(202).json({message: "Your order has been executed", status: 202});
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
        let objectText;
        if (currency === 'btc') {
            objectText = 'BTC_coin'
        }else if (currency === 'eth') {
            objectText = 'ETH_coin'
        }else if (currency === 'trx') {
            objectText = 'TRX_coin'
        }else if (currency === 'bnb') {
            objectText = 'BNB_coin'
        }else if (currency === 'codeo') {
            objectText = 'CODEO_coin'
        }else if (currency === 'ltc') {
            objectText = "LTC_coin"
        };
        let coinBalance;
        Account.findOne({user})
            .then(account => {
                if (account) {
                    coinBalance = account[objectText]
                    if (coinBalance) {
                        LimitTrade.findOne({currency, order_type, user})
                            .then(userTrade => {
                                if (userTrade) {
                                    let totalAmounts = Number(amount) + userTrade.amounts
                                    let allPrices = userTrade.prices;
                                    allPrices.push(Number(price));
                                    let totalPrices = 0;
                                    allPrices.forEach(item => {
                                        totalPrices += item
                                    })
                                    let avg = totalPrices / allPrices.length;
                                    let total_coin_price = avg * totalAmounts;
                                    if (totalAmounts < coinBalance) {
                                         return LimitTrade.updateOne({_id: userTrade.id}, {total: total_coin_price.toFixed(2), average_price: avg.toFixed(2), prices: allPrices, amounts: totalAmounts }, {omitUndefined: true})
                                            .then(() => {
                                                 return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'})
                                                    .then(trades => {
                                                        Io.emit(`${order_type}-limit`, {trades, currency})
                                                        res.status(202).json({message: `Your order has been executed`, status: 202})
                                                    })
                                            })
                                    }else {
                                        next({message: `Your coin balance not enough`})
                                    }
                                }else {
                                    req.coinBalance = coinBalance;
                                    next();
                                }
                            })
                    }else {
                        next({message: `You don't have this coin or your coin not enough`})
                    }
                }else {
                    next({message: 'Please make account first'})
                }
            })
            .catch(next)
    };

    static createSellOrderStep2(req,res,next) {
        let { amount, price, order_type, currency } = req.body;
        let user = req.decoded.id;
        let Io = req.Io;
        let totalPrice = Number(amount) * Number(price)
        let coinBalance = req.coinBalance;
        if (amount < coinBalance) {
            return LimitTrade.create({total: totalPrice, amounts: Number(amount), prices: [Number(price)], order_type, currency, average_price: Number(price), user})
                .then(trade => {
                    return LimitTrade.find({order_type, currency}).sort({updatedAt: 'desc'})
                        .then(trades => {
                            Io.emit(`${order_type}-limit`, {trades, currency})
                            res.status(200).json({message: `Your coin is not enough`})
                        })
                })
                .catch(next);
        }else {
            next({message: `Your coin is not enough`})
        }
    };

    static deleteLimitOrder(req,res,next) {
        let tradeId = req.params.tradeId;
        LimitTrade.deleteOne({_id: tradeId})
            .then(() => {
                res.status(200).json({message: `Your limit order already deleted`})
            })
            .catch(next)
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