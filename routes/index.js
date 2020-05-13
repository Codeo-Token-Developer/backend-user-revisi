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
const notif = require('./otherRouter/notification');

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
Router.use('/notif', notif);
Router.use(require('./Trade'));

//LaunchPad
Router.use('/project', require('./launchpadRouter/projectRouter'));

module.exports = Router;