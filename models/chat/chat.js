const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chats: [],
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}})

module.exports = mongoose.model('Chat', chatSchema);