const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');
const {readMe, readAll} = require('../../controllers/others/notification')

Router.get('/one', userAuthentication, readMe);
Router.get('/', userAuthentication, readAll);
// Router.get('/myLogHistory')

module.exports = Router;