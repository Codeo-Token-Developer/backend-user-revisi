const cron = require('node-cron');
const RegisterToday = require('../models/Other/registerToday');

function DeleteRegisterToday () {

    cron.schedule('0 0 * * *',  async () => {
        RegisterToday.deleteMany({})
            .then(() => {
                return
            })
            .catch(err => {
                console.log(err);
            })
    })

};



module.exports = { DeleteRegisterToday }
