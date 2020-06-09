const express = require('express');
const Router = express.Router();
const { readAllLimit, readMyLimit, createBuyOrder, createBuyOrderStep2 } = require('../../controllers/exchange/tradeController')
// const { readAllLimit, createLimitOrderSell,readMyLimit, createLimitOrderBuy, updateLimitOrder, readAllOrder, readMyOrder } = require('../../controllers/exchange/tradeController');
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/trade/limit/:coin', readAllLimit);
Router.get('/trade/myLimit/:coin', userAuthentication, readMyLimit);
Router.post('/trade/limit/buy', userAuthentication, createBuyOrder, createBuyOrderStep2);


module.exports = Router;