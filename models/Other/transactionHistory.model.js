const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({

     transactions: {
         type: Array,
         default: [],
     }

})

module.exports = mongoose.model('Array', TransactionsSchema);