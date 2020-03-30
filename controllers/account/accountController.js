const { getNewAddress } = require('../ethereum/ethereumController');
const Account = require('../../models/AccountSide/account.model');
const { encryptAccount } = require('../../helpers/encryptKey');
const User = require('../../models/AuthSide/user.model');

class AccountController {

    static readAll(req,res,next) {
        Account.find({})
            .then(function (accounts) {
                res.status(200).json({accounts, status: 200})
            })
            .catch(next)
    };

    static async create(req,res,next) {

            let userId = req.decoded.id;
            let newAccount = {
                ETH: '',
                key: ''
            }
            let userAccount;
            await getNewAddress(function(err, data) {
                if (data) {
                    newAccount.ETH = data.address;
                    newAccount.key = data.privateKey;
                }else {
                    next(err);
                }
            })
            
            Account.findOne({user: userId})
                .then(function (user) {
                    if (user) {
                        next({message: 'You already have account'})
                    }else {
                        return Account.create({ETH: newAccount.ETH, key: newAccount.key, user: userId})
                    }
                })
                .then(function (account) {
                    userAccount = account;
                    return User.updateOne({_id: userId}, {account: account.id})
                })
                .then( async function() {
                    userAccount.key = await encryptAccount(userAccount.key);
                    res.status(202).json({message: 'Your account has been created', userAccount, status: 202})
                })
                
                .catch(next);

    };

    static readMe(req,res,next) {
        let userId = req.decoded.id;
        let account = {}
        Account.findOne({user: userId})
            .then( async function(myAccount) {
                let account = {};
                let enckey = await encryptAccount(myAccount.key);
                account.id = myAccount.id;
                account.ETH = myAccount.ETH;
                account.key = enckey;
                account.user = myAccount.user;
                account.created_at = myAccount.created_at;
                account.updatedAt = myAccount.updatedAt;
                
                res.status(200).json(account);
            })
            .catch(next);
    };

    static readMyEth(req,res,next) {
        let userId = req.decoded.id;
        Account.findOne({user: userId})
            .then(function (account) {
                res.status(200).json({eth: account.ETH, status: 200})
            })
            .catch(next);
    };

};


module.exports = AccountController;