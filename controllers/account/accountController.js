const { getNewAddress } = require('../ethereum/ethereumController');
const Account = require('../../models/AccountSide/account.model');
const { encryptAccount } = require('../../helpers/encryptKey');
const User = require('../../models/AuthSide/user.model');
const { generateAddress, getAddressDetail } = require('../API/addressApi');


class AccountController {

    static readAll(req, res, next) {
        Account.find({})
            .then(function (accounts) {
                res.status(200).json({ accounts, status: 200 })
            })
            .catch(next)
    };

    static async create(req, res, next) {

        let userId = req.decoded.id;

        let newAccount = {
            ETH: '',
            key: ''
        }
        let userAccount;
        await getNewAddress(async function (err, data) {
            if (data) {
                newAccount.ETH = data.address;
                newAccount.key = data.privateKey;
            } else {
                next(err);
            }
        })

        Account.findOne({ user: userId })
            .then(async function (user) {
                if (user) {
                    return next({ message: 'You already have account' })
                } else {
                    let accountKey = await encryptAccount(newAccount.key);
                    return Account.create({ ETH: newAccount.ETH, key: accountKey, user: userId })
                }
            })
            .then(function (account) {
                userAccount = account;
                return User.updateOne({ _id: userId }, { account: account.id })
            })
            .then(function () {
                res.status(202).json({ account: userAccount, status: 202 })
            })

            .catch(next);

    };

    static readMe(req, res, next) {
        let userId = req.decoded.id;
        let account = {}
        Account.findOne({ user: userId })
            .then(async function (myAccount) {
                let account = {};
                // let enckey = await encryptAccount(myAccount.key);
                account.id = myAccount.id;
                account.ETH = myAccount.ETH;
                account.key = JSON.parse(JSON.stringify(myAccount.key));
                account.user = myAccount.user;
                account.created_at = myAccount.created_at;
                account.updatedAt = myAccount.updatedAt;

                res.status(200).json({ account, status: 200 });
            })
            .catch(next);
    };

    static readMyEth(req, res, next) {
        let userId = req.decoded.id;
        Account.findOne({ user: userId })
            .then(function (account) {
                res.status(200).json({ eth: account.ETH, status: 200 })
            })
            .catch(next);
    };

};


module.exports = AccountController;