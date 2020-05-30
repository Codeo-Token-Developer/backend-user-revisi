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

    static createLimitOrder(req,res,next) {
        let user = req.decoded.id;
        let { amount, price, order_type, currency } = req.body;
        LimitTrade.findOne({user, order_type, currency})
            .then(result => {
                if (result) {
                    let allPrices = result.prices;
                    allPrices.push(price);
                    let totalAmount = result.amounts + amount;
                    req.allPrices = allPrices;
                    req.totalAmount = totalAmount
                    req.resultTrade = result;
                    next();
                }else {
                    return LimitTrade.create({amounts: amounts, prices: [price], average: price, currency, order_type, user})
                }
            })
            .then(trade => {
                res.status(202).json({message: 'Your limit order has been executed', status: 202})
            })
            .catch(next);
    };

    static updateLimitOrder(req,res,next) {
        let { allPrices, totalAmount, resultTrade } = req;
        console.log(allPrices, totalAmount, resultTrade);
        res.end();
    };

    static readAllOrder(req,res,next) {
        TradeHistory.find({})
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

    

};

module.exports = TradeController;