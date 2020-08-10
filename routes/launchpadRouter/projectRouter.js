const express = require('express');
const Router = express.Router()
const { userAuthentication, userAuthorization } = require('../../middlewares/Auth')
const LaunchpadController = require('../../controllers/launchpad/launchpadController')
const LaunchpadTransaction = require('../../controllers/launchpad/LaunchpadTransaction')

Router.get('/lp/projects', userAuthentication, LaunchpadTransaction.findAll)
Router.get('/lp/project/:id', userAuthentication, LaunchpadTransaction.findOne)
Router.post('/lp/apply',userAuthentication, LaunchpadController.createApplyProject)
Router.get('/lp/buy', userAuthentication, LaunchpadTransaction.buySupply)

module.exports = Router