const express = require('express');
const Router = express.Router();
const { readAll, readMe } = require('../../controllers/others/accountHistoryController');
const { userAuthentication } = require('../../middlewares/Auth')

Router.get('/',userAuthentication, readMe);

module.exports = Router;