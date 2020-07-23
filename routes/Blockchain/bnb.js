const express = require('express');
const Router = express.Router();
const { sendBNB, sendAdminBNB, referralStorage } = require('../../controllers/transfer/bnbTransferController');
const checkRef = require('../../middlewares/referralCheck');
const { info, history } = require("../../controllers/API/bnb");
const { userAuthentication } = require("../../middlewares/Auth");

Router.get("/infoAccount/:Address", userAuthentication, info);
Router.post("/transfer/", userAuthentication, checkRef, sendBNB, sendAdminBNB, referralStorage);
Router.get("/historyAccount/", userAuthentication, history);

// Router.get('/myLogHistory')

module.exports = Router;
