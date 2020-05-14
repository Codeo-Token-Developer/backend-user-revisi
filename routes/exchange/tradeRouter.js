const express = require('express');
const Router = express.Router();
const TradeController = require('../../controllers/exchange/tradeController')
const { userAuthentication, TradeAuthorization } = require('../../middlewares/Auth');

Router.get('/trade', TradeController.readAll);
Router.get('/trade/myTrade', userAuthentication,TradeController.readMe);
Router.post('/trade', userAuthentication, TradeController.create);
Router.patch('/trade/:tradeId', userAuthentication, TradeAuthorization,TradeController.updateTrade);

module.exports = Router;