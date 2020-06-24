const express = require('express');
const Router = express.Router();
const { readAll, create, readMe, readMyEth } = require('../../controllers/account/accountController');

//Auth;
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/', readAll);
Router.post('/newAccount', userAuthentication, create);
Router.get('/myAccount', userAuthentication, readMe);
Router.get('/eth', userAuthentication, readMyEth);

module.exports = Router;