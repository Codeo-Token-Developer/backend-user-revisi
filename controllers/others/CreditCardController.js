const CreditCard = require('../../models/Other/creditCard.model');
const notif = require('../../models/Other/notification');
const notifAd = require('../../models/Other/notifAdmin');


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
        let Io = req.Io;
        let { card_name,card_number, exp_date, cvc } = req.body;
        CreditCard.findOne({user})
            .then(function (card) {
                if (card) {
                    return next({message: 'You already have credit card account, waiting for approval'})
                }else {
                    return CreditCard.create({card_name,card_number, exp_date, cvc, user})
                    .then(notif.create({text:'Waiting for admin approval', user})
                        .then(notifs => {
                        Io.emit('user-notif', notifs);
                        next();
                        })
                    ) 
                        .then(notifAd.create({text:`${user} send a credit card request`, user})
                            .then(Adnotifs => {
                            Io.emit('admin-notif', Adnotifs);
                            next();
                            })
                        )
                }
            })
            .then(function (card) {
                res.status(202).json({message: 'Waiting for admin approval', status: 202})
            })
            .catch(next);
    };

    static update(req,res,next) {
        let user = req.decoded.id;
        let {card_number, exp_date, cvc } = req.body;
        CreditCard.updateOne({user}, {card_name,card_number, exp_date, cvc}, {
            omitUndefined: true
        })
        .then(function() {
            res.status(201).json({message: 'Your Credit card data already update', status: 201})
        })
        .catch(next);
    };

};

module.exports = CreditCardController;