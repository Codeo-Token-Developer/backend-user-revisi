const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({

    payment: {
        type: String,
    },
    payment_type: {
        type: String
    },
    amount: {
        type: Number,
    },
    details: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{versionKey: false, timestamps: {createdAt: 'createdAt'}})

const history = mongoose.model('PaymentHistory', historySchema);

module.exports = history;