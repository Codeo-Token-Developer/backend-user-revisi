const Crypto = require('../../models/Other/crypto.model');

class CryptoController {

    static readAll(req,res,next) {
        Crypto.find({})
            .then(function (cryptos) {
                res.status(200).json({cryptos, status: 200});
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let userId = req.decoded.id;
        Crypto.findOne({user: userId})
            .then(function (crypto) {
                res.status(200).json({crypto, status: 200});
            })
    };

    static create(req,res,next) {
        let userId = req.decoded.id;
        let { paypal_email, address_bitcoin, address_ethereum } = req.body;
        Crypto.findOne({user: userId})
            .then(function (user) {
                if (user) {
                    next({message: 'You already have crypto account, waiting for approval'})
                }else {
                   return  Crypto.create({paypal_email, address_ethereum, address_bitcoin, user: userId})
                }
            })
            .then(function (crypto) {
                res.status(202).json({message: 'Waiting for admin approval', status: 202})
            })
            .catch(next);
    };

    static update(req,res,next) {

    };

};

module.exports = CryptoController;