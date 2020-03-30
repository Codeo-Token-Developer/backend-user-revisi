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

module.exports = Router;