const express = require("express");
const Router = express.Router();

const Auth = require("../../middlewares/Auth").userAuthentication;
let { Generating, VerifyingToken,NonActive2FA,Checking2FA } = require("../../controllers/twoAuth/twoAuth");

Router.get("/security/2fa", Auth, Generating);

Router.get("/security/check", Auth, Checking2FA);

Router.post("/security/codeoGuard", Auth, VerifyingToken);

Router.delete("/security/codeoGuard", Auth, NonActive2FA);

module.exports = Router;