const mongoose = require('mongoose');

const tradeHistory = new mongoose.Schema({
    pair: {
        type: String,
    },
    date: {
        type: Date,
    },
    order_type: {
        type: String,
    },
    side: {
        type: String,
    },
    price: {
        type: Number,
    },
    filled_all: {
        type: String,
    },
    status: {
        type: String,
    },
});

const trade = mongoose.model('TradeHistory', tradeHistory);

module.exports = trade;