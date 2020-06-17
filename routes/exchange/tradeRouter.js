const express = require('express');
const Router = express.Router();
const { readAllLimit, 
    createSellMarketHistory,
    readMyLimit, createLimitBuy, createLimitSell, readAllHistory, readMyHistory, checkOtherBuyLimit,createBuyMarketHistory } = require('../../controllers/exchange/tradeController');
const { userAuthentication } = require('../../middlewares/Auth');

Router.get('/trade/limit/:coin', readAllLimit);
// Router.get('/trade/myLimit/:coin', userAuthentication, readMyLimit);
Router.post('/trade/limit/buy', userAuthentication, createLimitBuy, checkOtherBuyLimit);
Router.post('/trade/limit/sell', userAuthentication, createLimitSell);

// //Market
Router.get('/trade/market/:pair', readAllHistory);
// Router.get('/trade/myMarket/:pair', userAuthentication, readMyHistory);
// Router.post('/trade/market/buy', userAuthentication, createBuyMarketHistory);
// Router.post('/trade/market/sell', userAuthentication, createSellMarketHistory);

// Router.delete('/trade/limit/:tradeId', userAuthentication, deleteLimitOrder);

module.exports = Router;