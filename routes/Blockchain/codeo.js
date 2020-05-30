const express = require("express");
const Router = express.Router();
const { userAuthentication } = require("../../middlewares/Auth");
const { info, history, transfer } = require("../../controllers/API/codeo");

Router.get("/infoAccount/:Address", userAuthentication, info);
Router.get("/historyAccount/:Address", userAuthentication, history);
Router.post("/transfer/:Address", userAuthentication, transfer);

// Router.get('/myLogHistory')

module.exports = Router;
