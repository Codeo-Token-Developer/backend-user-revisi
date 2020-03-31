const mongoose = require('mongoose');

const adminFeeHistory = new mongoose.Schema({
    transaction_id: {
        type: String,
    },
    transaction_status: {
        tyle: Boolean
    },
    value: {
        type: Number
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    admin_address: {
        type: String,
    },

}, {versionKey: false, timestamps: {createdAt: 'createdAt'}})


module.exports = mongoose.model('AdminFeeHistory', adminFeeHistory);