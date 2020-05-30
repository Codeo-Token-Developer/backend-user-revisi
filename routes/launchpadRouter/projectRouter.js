const express = require('express');
const Router = express.Router();
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth');
const ProjectController = require('../../controllers/launchpad/launchpadController');

Router.post('/step1', (req,res,next) => {
    console.log('Masuk Router');
    next();
},userAuthentication, ProjectController.step1);
Router.post('/step2', userAuthentication, ProjectController.step2);
Router.patch('/step3', userAuthentication, ProjectController.step3);
Router.patch('/step4', userAuthentication, ProjectController.step4);
Router.patch('/step5', userAuthentication, ProjectController.step5);
Router.patch('/step6', userAuthentication, ProjectController.step6);
Router.patch('/step7', userAuthentication, ProjectController.step7);
Router.patch('/step8', userAuthentication, ProjectController.step8);
Router.get('/myProjects', userAuthentication, ProjectController.readMyProject);
Router.get('/notCompleted', userAuthentication, ProjectController.readMyNotCompleted);

module.exports = Router;