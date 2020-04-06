const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');
const { create, readMe } = require('../../controllers/others/CreditCardController')

Router.post('/', userAuthentication, create);
Router.get('/myCreditCard', userAuthentication, readMe);

module.exports = Router;
