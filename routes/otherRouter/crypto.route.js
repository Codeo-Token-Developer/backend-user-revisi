const express = require('express');
const Router = express.Router();
const { create, readMe } = require('../../controllers/others/cryptoController');
const { userAuthentication } = require('../../middlewares/Auth');

Router.post('/', userAuthentication, create);
Router.get('/myCrypto', userAuthentication, readMe);

module.exports = Router;