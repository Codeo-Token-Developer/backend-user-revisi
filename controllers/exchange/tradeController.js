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
                                    return LimitTrade.find({})
                                        .then(allTrades => {
                                            Io.emit(`${pair}-limit`, allTrades)
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
        let myTrade = req.myTrade;
        let myAccountId = req.accountId;
        let { order_type, currency, pair } = req.body;
        let amount = Number(req.body.amount);
        let price = Number(req.body.price);

        LimitTrade.find({price: {$lte: price}, order_type: 'sell'})
            .then(filterTrade => {
                console.log(filterTrade);
                res.json(filterTrade)
            })
            .catch(next);

    };


    static createLimitSellOrder(req,res,next) {
        let { order_type, currency, pair } = req.body;
        let amount = Number(req.body.amount);
        let price = Number(req.body.price);
        let user = req.decoded.user;

        LimitTrade.create({order_type, amount, price, user, currency, pair})
            .then(newTrade => {
                res.json(newTrade)
            })
            .catch(next)

    }



}


module.exports = TradeController;