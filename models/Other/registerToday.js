const mongoose = require('mongoose');

const registerTodaySchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    username: {
        type: String,
    }
});


const registerToday = mongoose.model('RegisterToday', registerTodaySchema);

module.exports = registerToday;