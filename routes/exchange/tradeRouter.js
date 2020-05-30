const express = require('express');
const Router = express.Router();
const { readAllLimit, createLimitOrderSell,readMyLimit, createLimitOrderBuy, updateLimitOrder, readAllOrder, readMyOrder } = require('../../controllers/exchange/tradeController');
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/trade/limit/:coin', readAllLimit)
Router.post("/trade/limit/buy", userAuthentication, createLimitOrderBuy);
Router.post("/trade/limit/sell", userAuthentication, createLimitOrderSell);

module.exports = Router;