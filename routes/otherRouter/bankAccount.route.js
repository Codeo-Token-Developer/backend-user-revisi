const express = require('express');
const Router = express.Router();
const bankAcccount = require('../../controllers/others/bankAccountController');
const { userAuthentication } = require('../../middlewares/Auth');

Router.post('/', userAuthentication, bankAcccount.create);
Router.get('/myBankAccount', userAuthentication, bankAcccount.readMe);

module.exports = Router;