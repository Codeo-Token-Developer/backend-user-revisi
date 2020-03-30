const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    bank_name: {
        type: String,
        required: [true, 'Bank name cannot be empty']
    },
    country: {
        type: String,
        required: [true, 'Country cannot be empty']
    },
    swift_code: {
        type: String,
    },
    account_holder_name: {
        type: String,
        required: [true, 'Account holder name cannot be empty']
    },
    account_number: {
        type: String,
        required: [true, 'Account number cannot be empty']
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

const bankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = bankAccount