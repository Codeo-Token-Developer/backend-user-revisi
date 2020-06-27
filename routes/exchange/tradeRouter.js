// const express = require('express');
// const Router = express.Router();
// const { readAllLimit, 
//     createSellMarketHistory,
//     readMyLimit, 
//     createLimitBuy, createLimitSell,
//     checkOtherSellLimit, 
//     readAllHistory, readMyHistory, 
//     checkOtherBuyLimit,createBuyMarketHistory } = require('../../controllers/exchange/tradeController');

const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');

const TradeController = require('../../controllers/exchange/tradeController');

Router.get('/trade/limit/:pair', TradeController.readAllLimit);
Router.get('/trade/myLimit/:coin', userAuthentication, TradeController.readMyLimit);
Router.post('/trade/limit/buy', userAuthentication, TradeController.createLimitBuyOrder, TradeController.checkOtherLimitBuyOrder);

Router.post('/trade/limit/sell', userAuthentication, TradeController.createLimitSellOrder)



module.exports = Router;

// Router.get('/trade/limit/:coin', readAllLimit);
// // Router.get('/trade/myLimit/:coin', userAuthentication, readMyLimit);
// Router.post('/trade/limit/buy', userAuthentication, createLimitBuy, checkOtherBuyLimit);
// Router.post('/trade/limit/sell', userAuthentication, createLimitSell, checkOtherSellLimit);

// // //Market
// Router.get('/trade/market/:pair', readAllHistory);
// // Router.get('/trade/myMarket/:pair', userAuthentication, readMyHistory);
// // Router.post('/trade/market/buy', userAuthentication, createBuyMarketHistory);
// // Router.post('/trade/market/sell', userAuthentication, createSellMarketHistory);

// // Router.delete('/trade/limit/:tradeId', userAuthentication, deleteLimitOrder);

// module.exports = Router;