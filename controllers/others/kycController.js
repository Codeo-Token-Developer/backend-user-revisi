const KYC = require('../../models/Other/kyc.model');
const notif = require('../../models/Other/notification');
const notifAd = require('../../models/Other/notifAdmin');

class kycController {

    static readAll(req,res,next) {
        KYC.find({})
            .then(function (kycs) {
                res.status(200).json({kycs, status: 200})
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        KYC.findOne({user})
            .then(function (kyc) {
                res.status(200).json({kyc, status: 200})
            })
            .catch(next);
    };

    static create(req,res,next) {
        let user = req.decoded.id;
        let Io = req.Io;
        let { id_number, document_type, country_issued, document_image, home_address, city, zip_code, phone_number1, phone_number2 } = req.body;
        KYC.findOne({user})
            .then(function(kyc) {
                if (kyc) {
                    return next({message: 'You already have kyc account, waiting for approval'})
                    .then()
                }else {
                    return  KYC.create({id_number, document_type, country_issued, document_image, home_address, city, zip_code, phone_number1, phone_number2, user})
                    .then(notif.create({text:'Waiting for admin approval', user})
                        .then(notifs => {
                        Io.emit('user-notif', notifs);
                        next();
                        })
                    )
                        .then(notifAd.create({text:`${user} send a KYC request`, user})
                            .then(Adnotifs => {
                            Io.emit('admin-notif', Adnotifs);
                            next();
                            })
                        )
                }
            })
        .then(function(kyc) {
                res.status(202).json({message: 'Waiting for admin approval', status: 202})
            })
            .catch(next);
    };

};

module.exports = kycController;