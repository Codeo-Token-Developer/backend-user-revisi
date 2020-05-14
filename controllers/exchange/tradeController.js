const Trade = require('../../models/exchange/Trade');

class TradeController {

    static readAll(req,res,next) {
        Trade.find({})
            .then(trades => {
                res.status(200).json(trades);
            })
            .catch(next)
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        Trade.find({user: user, status: 'open'})
            .then(trades => {
                res.status(200).json(trades)
            })
            .catch(next);
    };

    static create(req,res,next) {
        let user = req.decoded.id;
        let { currency, order_type, amount, price } = req.body;
        Trade.create({currency, order_type, amount, price, user})
            .then(trade => {
                res.status(202).json(trade)
            })
            .catch(next)
    };

    static updateTrade(req,res,next) {
        console.log(req.body)
        let tradeId = req.params.tradeId;
        let { gain_loss } = req.body
        Trade.updateOne({_id: tradeId}, {gain_loss, status: 'closed'}, {omitUndefined: true})
            .then(() => {
                res.status(201).json({message: "Trade has been closed"})
            })
            .catch(next)
    };

};


module.exports = TradeController;