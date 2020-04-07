const Account = require('../../models/AccountSide/account.model');
const TransferCodeo = require('../../helpers/codeoTransfer');
const TransactionHistory = require('../../models/Other/transactionHistory.model');
const accountHistory = require('../../models/AccountSide/accountHistory.model');
const AdminFeeHistory = require('../../models/AdminSide/adminFeeHistory');
const Referral = require('../../models/Other/referral.model');
const User = require('../../models/AuthSide/user.model');

class CodeoTransferController {

    static sendCodeo (req,res,next) {
        console.log('Masuk sendCodeo ==========================================================')
        let user = req.decoded.id;
        let { myValue, toAddress, adminValue } = req.body;
        Account.findOne({user})
            .then( async function (account) {
                req.myAccount = account
                let key = JSON.parse(JSON.stringify(account.key))
                TransferCodeo(toAddress, myValue, key)
                    .then(function (events) {
                        req.events = events;
                        let myHistory = events[events.length - 1];
                        let myResult = JSON.parse(JSON.stringify(myHistory.returnValues));
                        accountHistory.create({
                            transaction_id: myHistory.transactionHash,
                            transaction_status: true,
                            value: myValue,
                            to: myResult.to,
                            user: user
                        })
                        .then(function (history) {
                            next();
                        })
                        .catch(err => {
                            accountHistory.create({
                                transaction_id: err.receipt.transactionHash,
                                transaction_status: false,
                                value: myValue,
                                to: toAddress,
                                user: user
                            })
                            .then(function (history) {
                                res.status(500).json({message: `Sending Failed`});
                            })
                            .catch(err => {
                                res.status(500).json({message: 'Sending Failed'});
                            });
                        })
                    })
                    .catch(next);
                
            })
            .catch(next)
    };

    static sendAdminCodeo(req,res,next) {
        console.log('Masuk sendAdminCodeo ==========================================================')

        let { adminValue } = req.body;
        console.log(adminValue, 'admin value')
        let myAccount = req.myAccount;
        let key = JSON.parse(JSON.stringify(myAccount.key));
        let adminETH;
        Account.findOne({role: 'admin'})
            .then(function (account) {

                let toAddress = account.ETH;
                adminETH = account.ETH;
                console.log(adminETH, 'ADMIN ETH -=========================================================')
                TransferCodeo(toAddress, adminValue, key)
                    .then(function (data) {
                        let events = data[data.length - 1]
                        AdminFeeHistory.create({
                            transaction_id: events.transactionHash,
                            transaction_status: true,
                            value: adminValue,
                            from: req.decoded.id,
                            admin_address: adminETH
                        })
                        .then(function(trans) {
                            console.log(trans, 'TRANS ADMIN =========================================')
                            next();
                        })
                    })
                    .catch(err => {
                        let { receipt } = err;
                        AdminFeeHistory.create({
                            transaction_id: receipt.transactionHash,
                            transaction_status: false,
                            value: adminValue,
                            from: req.decoded.id,
                            admin_address: adminETH
                        })
                        .then(function (trans) {
                            res.status(500).end();
                        })
                        .catch(err => {
                            res.status(500).end();
                        })
                    })
            })
       
    };

    static referralStorage(req,res,next) {
        console.log('Masuk referall Storage');
        let refUser = req.refUser;
        
        if (refUser) {

            User.findOne({username: refUser.user})
                .then(function (user) {
                   return Referral.create({user: user.id, ref_amount: refUser.refValue})
                    
                })
                .then(function(ref) {
                    console.log(ref, 'This is Ref')
                    res.status(202).json(ref);
                })
                .catch(next)

        }else {
            res.status(202).json({message: 'Done!!!'})
        }


        // if (refUser) {
        //     Referral.create({user: refUser.user.id, ref_amount: refUser.refValue})
        //         .then(function(reff) {
        //             console.log(reff)
        //             res.status(202).json(reff)
        //         })
        //         .catch(next)
        // }else {
        //     res.status(202).json({message: 'Done!!!'})
        // }
    };

};


module.exports = CodeoTransferController;