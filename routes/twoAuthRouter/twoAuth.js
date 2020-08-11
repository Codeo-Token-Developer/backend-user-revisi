const express = require("express");
const Router = express.Router();

const Auth = require("../../middlewares/Auth").userAuthentication;
let { Generating, VerifyingToken } = require("../../controllers/twoAuth/twoAuth");

Router.get("/security/2fa", Auth, Generating);

Router.post("/security/codeoGuard", Auth, VerifyingToken);

module.exports = Router;