const mongoose = require('mongoose');

var Schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
     },
    text: String
});

module.exports= mongoose.model('usernotif', Schema);