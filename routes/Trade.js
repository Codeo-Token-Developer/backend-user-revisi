const Router = require('express').Router();
const { userAuthentication, userAuthorization } = require('../middlewares/Auth');
const TradeController = require('../controllers/trade/TradeController')

Router.get('/trade', TradeController.readAll);
Router.get('/trade/myTrade', userAuthentication,TradeController.readMe);
Router.post('/trade', userAuthentication, TradeController.create);
Router.patch('/trade/:tradeId', userAuthentication, TradeController.updateTrade);

module.exports = Router;