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
const sandboxRouter = require('./sandboxRouter');

Router.use('/injection', injectionRouter);
Router.use('/sandbox', sandboxRouter)

//User Router
Router.use('/users', users);

//AccountRouter
Router.use('/accounts', accounts);
Router.use('/logHistory', logHistory);

//Transfer
Router.use('/transfer', transferRouter);

//OtherRouter
Router.use('/crypto', cryptoRouter);
Router.use('/credit-card', creditCardRouter);
Router.use('/kyc', kycRouter);
Router.use('/history', historyRouter);
Router.use('/api', fromEmail);
Router.use('/fee', feeRouter);
Router.use('/bankAccount', bankAccountRouter);


const Account = require('../models/AccountSide/account.model');
const History = require('../models/AccountSide/accountHistory.model');
const Trans = require('../models/Other/transactionHistory.model');

Router.get('/historys', (req,res,next) => {
    History.find({})
        .then(function (h) {
            res.json(h)
        })
        .catch(next);
})

Router.get('/transaction', (req,res,next) => {
    Trans.find({})
        .then(function (trs) {
            res.json(trs)
        })
        .catch(next)
})

Router.delete('/', function (req,res,next) {
    console.log(req.params.text)
    Account.deleteMany({})
        .then(function() {
            res.send('Oke')
        })
        .catch(err => {
            console.log(err)
        })
})

Router.get('/test', (req,res,next) => {
    console.log(req.body);
    res.json({hallo})
})




module.exports = Router;