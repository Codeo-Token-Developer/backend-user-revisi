const mongoose = require('mongoose');

const tradeHistory = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount cannot be empty']
    },
    price: {
        type: Number,
        required: [true, 'Price cannot be empty']
    },
    order_type: {
        type: String,
        required: [true, 'Order type cannot be empty']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pair: {
        type: String,
        required: [true, 'Pair cannot be empty']
    },
    
    currency: {
        type: String,
    },
    total: {
        type: Number
    },
    filled: {
        type: Number,
        default: 0
    }
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}});

const trade = mongoose.model('TradeHistory', tradeHistory);

module.exports = trade;