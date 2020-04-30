const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
     },
    text: String
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}});

module.exports= mongoose.model('usernotif', Schema);