const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema ({
    ETH: {
        type: String,
        max: 64
    },
    key: {
        type: Map,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: {
        type: Number,
        default: 0.00
    },
    role: {
        type: String
    },
    BTC_coin: {
        type: Number,
        default: 0.00
    },
    ETH_coin: {
        type: Number,
        default: 0.00
    },
    TRX_coin: {
        type: Number,
        default: 0.00
    },
    BNB_coin: {
        type: Number,
        default: 0.00
    },
    CODEO_coin: {
        type: Number,
        default: 0.00
    }
    
},{ versionKey: false, timestamps: {createdAt: 'created_at'} });


const account = mongoose.model('Account', accountSchema);

module.exports = account