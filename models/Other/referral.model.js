const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_amount: {
        type: Number
    }
}, {versionKey: false, timestamps: {createdAt: 'created_at'}})

module.exports = mongoose.model('Referral', referralSchema);
