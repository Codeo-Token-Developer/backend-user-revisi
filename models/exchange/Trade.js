const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    order_type: {
        type: String,
    },
    amount: {
        type: Number,
    },
    price: {
        type: Number,
        required: [true, 'Price cannot be empty']
    },
    currency: {
        type: String,
    },
    status: {
        type: String,
        default: 'open'
    },
    gain_loss: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'User'
    }
    
})


module.exports = mongoose.model('Trade', TradeSchema)