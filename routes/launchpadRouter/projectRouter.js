const express = require('express');
const Router = express.Router();
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth');
const ProjectController = require('../../controllers/launchpad/launchpadController');

Router.post('/step1', (req,res,next) => {
    console.log('Masuk Router');
    next();
},userAuthentication, ProjectController.step1);
Router.post('/step2', userAuthentication, ProjectController.step2);
Router.post('/step3', userAuthentication, ProjectController.step3);
Router.post('/step4', userAuthentication, ProjectController.step4);
Router.post('/step5', userAuthentication, ProjectController.step5);
Router.post('/step6', userAuthentication, ProjectController.step6);
Router.post('/step7', userAuthentication, ProjectController.step7);
Router.post('/step8', userAuthentication, ProjectController.step8);
Router.get('/myProjects', userAuthentication, ProjectController.readMyProject);
Router.get('/myProjectNotCompleted', userAuthentication, ProjectController.getMyProjectNotCompleted);

module.exports = Router;