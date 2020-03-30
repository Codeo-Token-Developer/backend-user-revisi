const express = require('express');
const Router = express.Router();
const { readAll, create, readMe, readMyEth } = require('../../controllers/account/accountController');

//Auth
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/', readAll);
Router.post('/newAccount', userAuthentication, create);
Router.get('/myAccount', userAuthentication, readMe);
Router.get('/eth', userAuthentication, readMyEth);

const Account = require('../../models/AccountSide/account.model');
const { encryptAccount } = require('../../helpers/encryptKey')

Router.get('/test', function (req,res, next) {

        
})

module.exports = Router;