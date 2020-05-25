const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    order_type: {
        type: String,
        required: [true, 'Order type cannot be empty']
    },
    prices: {
        type: [Number]
    },
    total_amount: {
        type: Number,
        required: [true, 'Amount cannot be empty']
    },
    coin: {
        type: String,
        required: [true, 'Coin type cannot be empty']
    },
    average_price: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const trade = mongoose.model('Trade', tradeSchema);

module.exports = trade;