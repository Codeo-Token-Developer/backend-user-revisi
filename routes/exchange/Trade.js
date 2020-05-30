const express = require('express');
const Router = express.Router();
const { userAuthentication } = require('../../middlewares/Auth');
const { checkOrderType, sellOrder ,readAll, readOrder, createOrder, UpdateOrder, balanceCheck, } = require('../../controllers/trade/TradeController');



module.exports = Router;
