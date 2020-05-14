const express = require('express');
const Router = express();
const { userAuthentication } = require('../../middlewares/Auth'); 
const cmsController = require('../../controllers/others/cmsController')

Router.get('/', userAuthentication, cmsController.readAll);


module.exports = Router;