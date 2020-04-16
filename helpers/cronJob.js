const cron = require('node-cron');
const RegisterToday = require('../models/Other/registerToday');

function DeleteRegisterToday () {

    cron.schedule('0 0 * * *',  async () => {
        await RegisterToday.deleteMany({})  
    })

};


module.exports = { DeleteRegisterToday }