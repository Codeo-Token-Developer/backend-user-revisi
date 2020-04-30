const BankAccount = require('../../models/Other/bankAccount.model');
const notif = require('../../models/Other/notification');
const notifAd = require('../../models/Other/notifAdmin');

class BankAccountController {

    static readAll(req,res,next) {
        BankAccount.find({})
            .then(function (bankAccounts) {
                res.status(200).json({bankAccounts, status: 200})
            })
            .catch(next)
    };

    static readMe(req,res,next) {
        let userId = req.decoded.id;
        BankAccount.findOne({user: userId})
            .then(function (myBankAccount) {
                res.status(200).json({myBankAccount, status: 200})
            })
            .catch(next)
    };

    static create(req,res,next) {
        let userId = req.decoded.id;
        let Io = req.Io;
        let { bank_name, country, swift_code, account_holder_name, account_number } = req.body;
        BankAccount.findOne({user: userId})
            .then(function(bank) {
                if (bank) {
                    next({message: 'You already submit bank account, waiting for approval'})
                }else {
                    return BankAccount.create({bank_name, country, swift_code, account_holder_name, account_number, user: userId})
                    .then(notif.create({text:'success to add bank account', user})
                        .then(notifs => {
                        Io.emit('user-notif', notifs);
                        next();
                        })
                    )
                        .then(notifAd.create({text:`${user} add bank account`, user})
                            .then(Adnotifs => {
                            Io.emit('admin-notif', Adnotifs);
                            next();
                            })
                        )

                }
            })
            .then(function (bank) {
                res.status(200).json({bank, status: 200})
            })
            .catch(next)
    };

};

module.exports = BankAccountController;