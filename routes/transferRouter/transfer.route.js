const express = require('express');
const Router = express.Router();
const { sendCodeo, sendAdminCodeo, referralStorage } = require('../../controllers/transfer/codeTransferController');
const checkRef = require('../../middlewares/referralCheck');


const Auth = require('../../middlewares/Auth').userAuthentication;

Router.post('/', Auth, checkRef, sendCodeo, sendAdminCodeo, referralStorage)

module.exports = Router;