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
        default: 0
    },
    role: {
        type: String,
        default: 0
    },
    BTC_coin: {
        type: Number,
        default: 0
    },
    ETH_coin: {
        type: Number,
        default: 0
    },
    TRX_coin: {
        type: Number,
        default: 0
    },
    BNB_coin: {
        type: Number,
        default: 0
    },
    CODEO_coin: {
        type: Number,
        default: 0
    },
    LTC_coin: {
        type: Number,
        default: 0
    }
    
},{ versionKey: false, timestamps: {createdAt: 'created_at'} });


const account = mongoose.model('Account', accountSchema);

module.exports = account