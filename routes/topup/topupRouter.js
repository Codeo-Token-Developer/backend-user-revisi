const express = require('express');
const Router = express.Router();
const TopupController = require('../../controllers/topup/topup');
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/topup', TopupController.readAll);
Router.get('/topup/me', userAuthentication,TopupController.readMe);
Router.post('/topup', userAuthentication,TopupController.create);
module.exports = Router;