const mongoose = require('mongoose');

const topupSchema = new mongoose.Schema({
    balance: {
        type: Number,
        require: [true, 'Balance cannot be empty']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approved_status: {
        type: Boolean,
        default: false
    }
})

const topupSchema = mongoose.model('TopUp', topupSchema)

module.exports = topupSchema;