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
    },
    role: {
        type: String
    },
    BTC_coin: {
        type: Number,
    },
    ETH_coin: {
        type: Number,
    },
    TRX_coin: {
        type: Number,
    },
    BNB_coin: {
        type: Number,
    },
    CODEO_coin: {
        type: Number,
    },
    LTC_coin: {
        type: Number
    }
    
},{ versionKey: false, timestamps: {createdAt: 'created_at'} });


const account = mongoose.model('Account', accountSchema);

module.exports = account