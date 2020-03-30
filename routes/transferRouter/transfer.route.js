const express = require('express');
const Router = express.Router();
const { sendCodeo } = require('../../controllers/transfer/codeTransferController');

const Auth = require('../../middlewares/Auth').userAuthentication;

Router.post('/', Auth, sendCodeo)

module.exports = Router;