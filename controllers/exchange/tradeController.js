
const Trade = require('../../models/exchange/Trade');

class tradeController {

    static readAll(req,res,next) {
        Trade.find({})
            .then(trades => {
                res.status(200).json(trades);
            })
            .catch(next)
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        Trade.find({user})
            .then(mytrades => {
                res.status(200).json({trades: mytrades, status: 200});
            })
            .catch(next)
    };

    static create(req,res,next) {
        let user = req.decoded.id;
        let { pair, order_type,side, price, filled, amount } = req.body;
        Trade.create({pair, order_type, side, price, filled, amount, user})
            .then(trade => {
                res.status(202).json({message: 'Your order has been executed'})
            })
            .catch(next);
    };

    static limitCreate(req,res,next) {
        let user = req.decoded.id;
        let { pair, order_type, side, limit_price, amount } = req.body;
        Trade.create({pair, order_type, side, limit_price, amount, isLimit: true, user})
            .then(trade => {
                res.status(200).json({message: 'Your limit order has been executed at' + limit_price})
            })
            .catch(next)
    };

    static updateLimitOrder(req,res,next) {
        let tradeId = req.params.tradeId;
        let { price, amount } = req.body;
        Trade.updateOne({_id: tradeId}, {price: price, isLimit: false, amount})
            .then(() => {
                res.status(201).json({message: `Your order limit has been executed`})
            })
            .catch(next)
    };

    

};

module.exports = tradeController;