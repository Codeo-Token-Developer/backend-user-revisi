const mongoose = require('mongoose');

const topupSchema = new mongoose.Schema({
    amount: {
        type: String,
        required:[true, 'Amount cannot be empty']
    },
    payment_method: {
        type: String,
        required: [true, 'Payment method cannot be emtpy']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{versionKey: false, timestamps: {createdAt: 'createdAt'}})

const topup = mongoose.model('TopUp', topupSchema)

module.exports = topup;