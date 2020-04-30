const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String
},{timestamps: {createdAt: 'createdAt'}});

module.exports= mongoose.model('usernotif', Schema);