const mongoose = require('mongoose');

const tradeMongoose = new mongoose.Schema({
    order_type: {
        type: String,
        required: [true, 'Order type cannot be empty']
    },
    prices: {
        type: [Number]
    },
    total_amount: {
        type: Number,
    },
    average_price: {
        type: Number
    },
    coin: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}})

module.exports = mongoose.model('Trade', tradeMongoose)

// const mongoose = require('mongoose');

// const tradeMongoose = new mongoose.Schema({

//     pair: {
//         type: String,
//     },
//     order_type: {
//         type: String,
//     },
//     side: {
//         type: String,
//     },
//     price: {
//         type: Number
//     },
//     filled: {
//         type: String,
//     },
//     status: {
//         type: Boolean,
//         default: false
//     },
//     isLimit: {
//         type: Boolean,
//         default: false,
//     },
//     limit_price: {
//         type: Number,
//     },
//     amount: {
//         type: Number,
//     }
// },{ versionKey: false, timestamps: {createdAt: 'date'} })

// const trade = mongoose.model("Trade", tradeMongoose);

// module.exports = trade;
