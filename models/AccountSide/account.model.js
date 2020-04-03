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
    }
},{ versionKey: false, timestamps: {createdAt: 'created_at'} });


const account = mongoose.model('Account', accountSchema);

module.exports = account