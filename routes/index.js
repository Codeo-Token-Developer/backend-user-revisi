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
const injectionRouter = require('./injection');

Router.use('/injection', injectionRouter);

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


const CreditCard = require('../models/Other/creditCard.model');
const KYC = require('../models/Other/kyc.model');

Router.delete('/kyc-delete', function(req,res,next) {
    KYC.deleteMany({})
        .then(function() {
            res.send('Oke')
        })
        .catch(next)
})

Router.delete('/deleteCredit', function (req,res,next) {
    CreditCard.deleteMany({})
        .then(function () {
            res.send('Oke')
        })
        .catch(next)
});

Router.get('/credit', function (req,res,next) {
    CreditCard.find({})
        .then(function (cards) {
            res.status(200).json(cards)
        })
        .catch(next);
})

// Router.patch('/patch/:userId', function (req,res,next) {
//     let userId = req.params.userId;
//     User.updateOne({_id: userId},{verification: true})
//         .then(function() {
//             res.send('Ok')
//         })
//         .catch(next)
// })

module.exports = Router;