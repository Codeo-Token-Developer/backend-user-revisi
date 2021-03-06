const express = require("express");
const Router = express.Router();
const { userAuthentication } = require("../../middlewares/Auth");
const {
  generateAddress,
  readMe,
  info,
  history, transfer
} = require("../../controllers/API/Bitcoint");

Router.post("/addAddress", userAuthentication, generateAddress);
Router.get("/Address", userAuthentication, readMe);
Router.get("/infoAccount/:Address", userAuthentication, info);
Router.get("/historyAccount/:Address", userAuthentication, history);
Router.post("/transfer", userAuthentication, transfer);

// Router.get('/myLogHistory')

module.exports = Router;
