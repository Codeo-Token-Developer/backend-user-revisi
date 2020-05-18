const mongoose = require('mongoose');

const tradeMongoose = new mongoose.Schema({

    pair: {
        type: String,
    },
    order_type: {
        type: String,
    },
    side: {
        type: String,
    },
    price: {
        type: Number
    },
    filled: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
    isLimit: {
        type: Boolean,
        default: false,
    },
    limit_price: {
        type: Number,
    },
    amount: {
        type: Number,
    }
},{ versionKey: false, timestamps: {createdAt: 'date'} })

const trade = mongoose.model("Trade", tradeMongoose);

module.exports = trade;
