const Topup = require('../../models');
const Account = require('../../models/AccountSide/account.model');
const PaymentHistory = require('../../models/History/paymentHistory');
const notif = require('../../models/Other/notification');
const notifAd = require('../../models/Other/notifAdmin');

class TopUpController {

    static readAll(req,res,next) {
        Topup.find({})
            .then(tops => {
                res.status(200).json({tops, status: 200})
            })
            .catch(next)        
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        Topup.find({user})
            .then(tops => {
                res.status(200).json({tops, status: 200})
            })
            .catch(next)
    };

    static create(req,res,next) {
        let user = req.decoded.id;
        let { amount, paymend_method } = req.body;
        let user_topup;
        let myBalance;
        Topup.create({amount, paymend_method, user})
            .then(tops => {
                user_topup = tops;
                return Account.findOne({user})
            })
            .then(account => {  
                myBalance = account.balance + amount;
                return Account.updateOne({user}, {balance: myBalance})
            })
            .then(() => {
                return PaymentHistory.create({payment: paymend_method, payment_type: 'deposit', amount: amount, details: 'Deposit to my account', status: true})
            })
            .then(payment_history => {
                res.status(202).json({message: 'Your deposit has been store to your balance'})
            })
            .catch(next)
    };

};

module.exports = TopUpController;