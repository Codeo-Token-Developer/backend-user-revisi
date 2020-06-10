const express = require('express');
const Router = express.Router();
const { readAllLimit, readMyLimit, createBuyOrder, createBuyOrderStep2, createSellOrder, createSellOrderStep2, deleteLimitOrder } = require('../../controllers/exchange/tradeController');
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/trade/limit/:coin', readAllLimit);
Router.get('/trade/myLimit/:coin', userAuthentication, readMyLimit);
Router.post('/trade/limit/buy', userAuthentication, createBuyOrder, createBuyOrderStep2);
Router.post('/trade/limit/sell', userAuthentication, createSellOrder, createSellOrderStep2);
Router.delete('/trade/limit/:tradeId', userAuthentication, deleteLimitOrder);

module.exports = Router;