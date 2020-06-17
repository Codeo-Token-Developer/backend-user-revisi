const mongoose = require('mongoose');

const limitTrade = new mongoose.Schema({

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
    },
    currency: {
        type: String
    },
    total: {
        type: Number
    },
    filled: {
        type: Number,
        default: 0
    },
    amount_start: {
        type: Number,
    }


}, {versionKey: false, timestamps: {createdAt: 'createdAt'}})

module.exports = mongoose.model('LimitTrade', limitTrade);