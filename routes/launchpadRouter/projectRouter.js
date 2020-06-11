const express = require('express');
const Router = express.Router();
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth');
const ProjectController = require('../../controllers/launchpad/launchpadController');

Router.post('/step1',userAuthentication, ProjectController.step1);


module.exports = Router;