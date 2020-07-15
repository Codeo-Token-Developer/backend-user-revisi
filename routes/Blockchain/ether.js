const express = require("express");
const Router = express.Router();
const { userAuthentication } = require("../../middlewares/Auth");
const { info, history } = require("../../controllers/API/Ether");
const { sendETH, sendAdminETH, referralStorage } = require('../../controllers/transfer/ethTransferController');
const checkRef = require('../../middlewares/referralCheck');

Router.get("/infoAccount", userAuthentication, info);
Router.get("/historyAccount", userAuthentication, history);
Router.post("/transfer", userAuthentication, checkRef, sendETH, sendAdminETH, referralStorage);

// Router.get('/myLogHistory')

module.exports = Router;
