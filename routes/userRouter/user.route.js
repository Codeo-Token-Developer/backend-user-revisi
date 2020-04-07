const express = require("express");
const Router = express.Router();

//Auth
const Auth = require("../../middlewares/Auth").userAuthentication;

const sendEmail = require("../../middlewares/sendEmailRegister");
const sendEmailForgotPassword = require("../../middlewares/sendEmailForgotPassword");
const sendEmailChangePassword = require("../../middlewares/sendEmaiChangePassword");

//Function
let {
  readAll,
  readMe,
  QrUpdate,
  create,
  login,
  logout,
  QrLogout,
  forgotPassword,
  changePassword,
  Update
} = require("../../controllers/user/userController");

Router.get("/", readAll);
Router.get("/account", Auth, readMe);
Router.post("/", create, sendEmail);
Router.post("/login", login);
Router.put('/', Auth, Update);

//forgotPassword
Router.post("/forgotPassword", forgotPassword, sendEmailForgotPassword);

//changePassword
Router.post("/changePassword", Auth, changePassword, sendEmailChangePassword);
Router.patch("/logout", Auth, logout);
Router.patch("/2faout", Auth, QrLogout);
Router.patch("/2fa", Auth, QrUpdate);

module.exports = Router;
