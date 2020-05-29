const express = require("express");
const Router = express.Router();
const { userAuthentication } = require("../../middlewares/Auth");
const { info, transfer } = require("../../controllers/API/tron");

Router.get("/infoAccount/:Address", userAuthentication, info);
Router.post("/transfer/:Address", userAuthentication, transfer);

// Router.get('/myLogHistory')

module.exports = Router;
