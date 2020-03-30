const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');
const { logHistory, readAllLogHistory } = require('../../controllers/user/userController');

Router.post('/', userAuthentication, logHistory);
Router.get('/', userAuthentication, readAllLogHistory);
// Router.get('/myLogHistory')

module.exports = Router;