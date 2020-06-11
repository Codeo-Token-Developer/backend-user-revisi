const express = require('express');
const Router = express.Router();
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth');
const ProjectController = require('../../controllers/launchpad/launchpadController');

Router.post('/applyProject',userAuthentication, ProjectController.createApplyProject);


module.exports = Router;