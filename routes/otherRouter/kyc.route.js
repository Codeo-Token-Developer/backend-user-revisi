const express = require("express");
const Router = express.Router();
const { userAuthentication } = require("../../middlewares/Auth");
const {
  create,
  readMe,
  deleteKYC,
} = require("../../controllers/others/kycController");

Router.post("/", userAuthentication, create);
Router.get("/myKyc", userAuthentication, readMe);
Router.delete("/:idNum", userAuthentication, deleteKYC);

module.exports = Router;
