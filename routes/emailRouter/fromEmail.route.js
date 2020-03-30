const express = require('express');
const Router = express.Router();
const verifyUser = require('./verifyUserRouter');
const password = require('./passwordRouter');

Router.use('/auth/verify', verifyUser);
Router.use('/auth/password', password);

module.exports = Router;