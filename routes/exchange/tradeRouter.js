const express = require('express');
const Router = express.Router();
const TradeController = require('../../controllers/exchange/tradeController')
const { userAuthentication, TradeAuthorization } = require('../../middlewares/Auth');

Router.get('/trade',TradeController.readAll);
Router.get('/trade/me', userAuthentication, TradeController);
Router.post('/trade', userAuthentication, TradeController.create);
Router.post('/trade/limit', userAuthentication, TradeController.limitCreate);
Router.patch('/trade', userAuthentication, TradeController.updateLimitOrder);

module.exports = Router;