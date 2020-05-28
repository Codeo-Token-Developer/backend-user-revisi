const mongoose = require('mongoose');

const limitTrade = new mongoose.Schema({

    amounts: {
        type: Number,
        required: [true, 'Amount cannot be empty']
    },
    prices: {
        type: [Number]
    },
    average_price: {
        type: Number,
    },
    order_type: {
        type: String,
        required: [true, 'Order type cannot be empty']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    currency: {
        type: String,
    }

}, {versionKey: false, timestamps: {createdAt: 'createdAt'}})

module.exports = mongoose.model('LimitTrade', limitTrade);