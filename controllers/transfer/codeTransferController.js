const Account = require('../../models/AccountSide/account.model');
const { encryptAccount } = require('../../helpers/encryptKey');
const TransferCodeo = require('../../helpers/codeoTransfer');

class CodeoTransferController {

    static sendCodeo (req,res,next) {

        let user = req.decoded.id;
        let { myValue, address } = req.body;
        Account.findOne({user})
            .then( async function (account) {
                // let key = encryptAccount(account.key);
                let PrivateKEY = JSON.parse(JSON.stringify(account.key));
                console.log()
                // TransferCodeo(address, myValue, key)
                res.send('Halo')
            })
            .catch(next)
    };

};


module.exports = CodeoTransferController;