const CreditCard = require('../../models/Other/creditCard.model');

class CreditCardController {

    static readAll(req,res,next) {
        CreditCard.find({})
            .then(function (cards) {
                res.status(200).json({cards, status: 200})
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        CreditCard.findOne({user})
            .then(function (card) {
                res.status(200).json({card, status: 200})
            })
            .catch(next);
    };

    static create(req,res,next) {
        let user = req.decoded.id;
        let { name, surname, card_number, exp_date, cvc } = req.body;
        CreditCard.findOne({user})
            .then(function (user) {
                if (user) {
                    next({message: 'You already have credit card account, waiting for approval'})
                }else {
                    return CreditCard.create({name, surname, card_number, exp_date, cvc, user})
                }
            })
            .then(function (card) {
                res.status(202).json({message: 'Waiting for admin approval', status: 202})
            })
    };

    static update(req,res,next) {
        let user = req.decoded.id;
        let { name, surname, card_number, exp_date, cvc } = req.body;
        CreditCard.updateOne({user}, {name, surname, card_number, exp_date, cvc}, {
            omitUndefined: true
        })
        .then(function() {
            res.status(201).json({message: 'Your Credit card data already update', status: 201})
        })
        .catch(next);
    };

};

module.exports = CreditCardController;