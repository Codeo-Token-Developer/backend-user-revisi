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
                    req.resultTrade = result;
                    
                }
            })
    };

    static updateLimitOrder(req,res,next) {

    };

    static readAllOrder(req,res,next) {

    };

    static readMyOrder(req,res,next) {

    };

};

module.exports = TradeController;