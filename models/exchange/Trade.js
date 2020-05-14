const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    order_type: {
        type: String,
        required: [true, "Order type cannot bne empty"]
    },
    price: {
        type: Number,
        required: [true, 'Price cannot be empty']
    },
    amount: {
        type: Number,
        required: [true, 'Amount cannot be empty']
    },
    currency: {
        type: String,
        required: [true, "Currency cannot be empty"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    gain_loss: {
        type: Number,
    },
    status: {
        type: String,
        default: 'open'
    }

})


module.exports = mongoose.model('Trade', tradeSchema);