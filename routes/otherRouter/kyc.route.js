const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');
const { create, readMe } = require('../../controllers/others/kycController')

Router.post('/', userAuthentication, create);
Router.get('/myKyc', userAuthentication, readMe);

module.exports = Router;