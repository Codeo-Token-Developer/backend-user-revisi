const Trade = require('../../models/exchange/Trade');

class TradeController {

    static readAll(req,res,next) {
        Trade.find({})
            .then(trades => {
                res.status(200).json(trades)
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        Trade.find({user, status: 'open'})
            .then(trades => {
                res.status(200).json(trades)
            })
            .catch(next)
    }

    static create(req,res,next) {
        let user = req.decoded.id;
        let { amount, currency, price, order_type } = req.body;
        Trade.create({amount, currency, price, order_type, user})
            .then(trade => {
                res.status(202).json(trade);
            })
            .catch(next);
    };

    static updateTrade(req,res,next) {
        let tradeId = req.params.tradeId;
        let { gain_loss } = req.body;
        Trade.updateOne({_id: tradeId}, {gain_loss, status: 'closed'})
            .then(() => {
                res.status(201).json({message: 'Order already close'})
            })
            .catch(next);
    };

};

module.exports = TradeController;