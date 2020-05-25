const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');
const { checkOrderType, sellOrder ,readAll, readOrder, createOrder, UpdateOrder, balanceCheck, } = require('../../controllers/trade/TradeController');

Router.get('/trade', readAll);
Router.post('/trade', userAuthentication, balanceCheck, createOrder, UpdateOrder);
Router.get('/trade/me/:order/:coin', userAuthentication, readOrder);
Router.post('/trade/sell', userAuthentication, checkOrderType, sellOrder)

module.exports = Router;
