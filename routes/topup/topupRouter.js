const express = require('express');
const Router = express.Router();
const TopupController = require('../../controllers/topup/topup');
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth');

Router.post('/', userAuthentication, TopupController.create);

module.exports = Router;