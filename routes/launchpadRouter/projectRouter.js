const express = require('express');
const Router = express.Router()
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth')

const LaunchpadController = require('../../controllers/launchpad/launchpadController')
const LaunchpadTransaction = require('../../controllers/launchpad/LaunchpadTransaction')

Router.get('/projects', userAuthentication, LaunchpadTransaction.findAll)
Router.get('/project/:id', userAuthentication, LaunchpadTransaction.findOne)
Router.post('/lp/apply',userAuthentication, LaunchpadController.createApplyProject)
Router.get('/buy/:id', userAuthentication, LaunchpadTransaction.buySupply)

module.exports = Router