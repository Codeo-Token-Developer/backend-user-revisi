const Account = require('../../models/AccountSide/account.model');
const TradeHistory = require('../../models/exchange/tradeHistory');
const LimitTrade = require('../../models/exchange/limitTrade');
const { generateText } = require('../../helpers/getObjectText');


class TradeController {

    static readAllLimit(req,res,next) {
        let pair = req.params.pair;
        LimitTrade.find({pair})
            .then(trades => {
                res.status(200).json(trades)
            })
            .catch(next)
    };

    static readMyLimit(req,res,next) {
        let user = req.decoded.id;
        let coin = req.params.coin;
        LimitTrade.find({user})
            .then(trade => {
                res.status(200).json(trade)
            })
            .catch(next)
    };

    static createLimitBuyOrder(req,res,next) {
        let Io = req.Io;
        let user = req.decoded.id;
        let { order_type, currency, pair } = req.body;
        let amount = Number(req.body.amount);
        let price = Number(req.body.price);
        let objectText = generateText(currency);
        let accountId;
        let tradeId;
        let amountLeft;

        Account.findOne({user})
            .then(account => {
                if (account) {
                    accountId = account.id;
                    let totalPrice;
                    if (objectText === 'balance') {
                        totalPrice = amount * price
                    }else {
                        totalPrice = amount
                    }
                    let allAmountHave = account[objectText];
                    if (totalPrice > allAmountHave) {
                        next({message: 'You dont have enough balance'});
                        return
                    }else {
                        amountLeft = allAmountHave - totalPrice
                    }

                    return LimitTrade.create({amount: Number(amount), price: Number(price), order_type, currency, user, total: totalPrice, pair, amount_start: Number(amount), user})
                        .then(trade => {
                            req.myTrade = trade;
                            req.myAccountId = accountId;
                            tradeId = trade.id;
                            return Account.updateOne({_id: tradeId}, { [objectText]: amountLeft }, {omitUndefined: true})
                                .then(() => {
                                    return LimitTrade.find({order_type: order_type})
                                        .then(allTrades => {
                                            Io.emit(`${pair}-limit`, {allTrades, order_type})
                                            next();
                                        })
                                })
                                .catch(err => {
                                    LimitTrade.deleteOne({_id: tradeId})
                                        .then(() => {
                                            next({message: "Internal server error"});
                                        })
                                })
                        })
                        .catch(err => {
                            next(err)
                        })
                }else {
                    next({message: "You dont have account, please create first"})
                }
            })
            .catch(next);
    };

    static checkOtherLimitBuyOrder(req,res,next) {
        let Io = req.Io;
        let myTrade = req.myTrade;
        let myAccountLeft = req.myTrade.amount;
        let myAccountId = req.accountId;
        let { order_type, currency, pair } = req.body;
        let amount = Number(req.body.amount);
        let price = Number(req.body.price);

        let limitAmount = Number(amount);
        let sellAmount = 0;
        let leftAmount;
        let leftTrade;
        let updateAccount = [];
        let updateAccountUser = []; 
        let percent;

        LimitTrade.find({price: {$lte: price}, order_type: 'sell'}).sort({price: 'asc'})
            .then(filterTrade => {
                if (filterTrade.length > 0) {
                //==========================================================
                    filterTrade.forEach(item => {
                        if (sellAmount < limitAmount) {
                            sellAmount += item.amount;
                            myAccountLeft -= item.amount;
                            if (sellAmount > limitAmount) {
                                leftTrade = item;
                                percent = item.amount;
                                updateAccount.push(item);
                                updateAccountUser.push({id: item.id, amount: percent})
                            }else {
                                item.amount = 0;
                                updateAccount.push(item);
                                updateAccountUser.push({id: item.id, amount: 0})
                            };
                    }});
                    if (sellAmount > limitAmount) {
                        leftAmount = sellAmount - limitAmount;
                        updateAccount[updateAccount.length -1].amount = leftAmount;
                        updateAccount[updateAccount.length -1].filled = leftAmount / percent;
                    }
                    updateAccount.forEach(item => {
                        if (item.amount === 0) {
                            item.filled = 1;
                        }
                    })
                    let allPromisesUpdateLimit = [];
                    let newAccount = [];
                    updateAccount.forEach(item => {
                        if (item.amount == 0) {
                           allPromisesUpdateLimit.push(LimitTrade.deleteOne({_id: item.id}))
                        }else {
                            allPromisesUpdateLimit.push(LimitTrade.updateOne({_id: item.id}, { amount:  item.amount, filled: item.filled, total: item.amount * item.price }, {omitUndefined: true}))
                        }
                    })

                    let allPromisesCreateHistory = [];
                    let accountWillUpdate = [];
                    updateAccount.forEach(item => {
                        allPromisesCreateHistory.push(TradeHistory.create({amount: item.amount, price: item.price, order_type: item.order_type, user: item.user, currency: item.currency, total: Number(item.amount) * Number(item.price), pair: item.pair, }))
                    })
                    if (myAccountLeft <= 0) {
                        
                        allPromisesUpdateLimit.push(LimitTrade.deleteOne({_id: myTrade.id}));
                        allPromisesCreateHistory.push(TradeHistory.create({amount: myTrade.amount, price: myTrade.price, order_type: myTrade.order_type, user: myTrade.user, currency: myTrade.currency, total: myTrade.total, pair: myTrade.pair}));
                    }else {
                        let percentage = Number(myAccountLeft) / Number(myTrade.amount_start);
                        let filled = 1 - percentage
                        allPromisesUpdateLimit.push(LimitTrade.updateOne({_id: myTrade.id}, {amount: myAccountLeft, total: myAccountLeft * myTrade.price, filled}))
                        allPromisesCreateHistory.push(TradeHistory.create({amount: myTrade.amount - myAccountLeft, total: (myTrade.amount - myAccountLeft) * myTrade.price, price: myTrade.price, order_type: myTrade.order_type, user: myTrade.user, pair: myTrade.pair}))
                    };

                    return Promise.all(allPromisesUpdateLimit)
                        .then(value => {
                            return Promise.all(allPromisesCreateHistory)
                                .then(value => {
                                    return LimitTrade.find({}).sort({price: 'asc'})
                                        .then(trades => {
                                            Io.emit(`${pair}-limit-check`, {trades, pair});
                                            res.end()
                                        })
                                })
                        })

                //==========================================================
                }else {
                    return LimitTrade.find({})
                        .then(trades => {
                            Io.emit(`${pair}-limit-check`, {trades, pair})
                            res.status(200).json({message: `Your order has been created`})
                        })
                } 

            })
            .catch(next);
    };

    // static createLimitSellOrder(req,res,next) {
    //     let { order_type, currency, pair } = req.body;
    //     let amount = Number(req.body.amount);
    //     let price = Number(req.body.price);
    //     let user = req.decoded.id;

    //     LimitTrade.create({order_type, amount, price, user, currency, pair, amount_start: amount})
    //         .then(newTrade => {
    //             res.json(newTrade)
    //         })
    //         .catch(next)
    // };

    static createLimitSellOrder(req,res,next) {
        let { order_type, currency, pair } = req.body;
        let amount = Number(req.body.amount);
        let price = Number(req.body.price);
        let user = req.decoded.id;
        let objectText = generateText(currency);

        Account.findOne({user})
            .then(userAccount => {
                user
            })
            .catch(next)
        
    }

    static deleteLimitTrade(req,res,next) {
        let limitTradeId = req.query.limit;
        let pair = req.query.pair;
        let order_type = req.query.type;
        let Io = req.io;

        LimitTrade.deleteOne({_id: limitTradeId})
            .then(() => {
                return LimitTrade.find({})
                    .then(trades => {
                        Io.emit(`${pair}-limit`, {allTrades, })
                    })
            })
            .catch(next)

    };

    


};




module.exports = TradeController;