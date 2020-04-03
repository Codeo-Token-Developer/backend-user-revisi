const express = require('express');
const Router = express.Router();

//Sub Route;
const users = require('./userRouter/user.route');
const accounts = require('./accountRouter/account.route');
const logHistory = require('./otherRouter/logHistory.route');
const fromEmail = require('./emailRouter/fromEmail.route');
const historyRouter = require('./otherRouter/history.route');
const kycRouter = require('./otherRouter/kyc.route');
const creditCardRouter = require('./otherRouter/creditCard.route');
const cryptoRouter = require('./otherRouter/crypto.route');
const transferRouter = require('./transferRouter/transfer.route');
const bankAccountRouter = require('./otherRouter/bankAccount.route');
const feeRouter = require('./otherRouter/fee.route');

Router.use('/users', users);
Router.use('/accounts', accounts);
Router.use('/logHistory', logHistory);

//Transfer
Router.use('/transfer', transferRouter);

Router.use('/crypto', cryptoRouter);
Router.use('/credit-card', creditCardRouter);
Router.use('/kyc', kycRouter);
Router.use('/history', historyRouter);
Router.use('/api', fromEmail);
Router.use('/fee', feeRouter);
Router.use('/bankAccount', bankAccountRouter);

// const Password = require('../models/AuthSide/password.model');
// Router.delete('/delete', (req,res,next) => {
//     Password.deleteMany({})
//         .then(function () {
//             res.send('OKe')
//         })
//         .catch(next)
// })
// const injectionRouter = require('./injection');

// Router.use('/injection', injectionRouter);

const Referral = require('../models/Other/referral.model');
const adminFeeHistory = require('../models/AdminSide/adminFeeHistory');
const AccountHistory = require('../models/AccountSide/accountHistory.model');
const Account = require('../models/AccountSide/account.model')

Router.delete('/delete', function (req,res,next) {
    Referral.deleteMany({})
        .then(function () {
            return adminFeeHistory.deleteMany({})
        })
        .then(function() {
            return AccountHistory.deleteMany({})
        })
        .then(function () {
            return Account.deleteMany({})
        })
        .then(function () {
            res.send('Success')
        })
        .catch(next)
});

const User = require('../models/AuthSide/user.model');

Router.put('/updateUser/:userId', function(req,res,next) {
    let { userId } = req.params
    User.updateOne({_id: userId}, {verification: true})
        .then(function () {
            res.send('oke')
        })
        .catch(next)
})

Router.delete('/userDelete/:userId', (req,res,next) => {
    let userId = req.params.userId;
    User.deleteOne({_id: userId})
        .then(function () {
            res.send(`${userId} Success deleted`)
        })
        .catch(next)
})


module.exports = Router;