const Account = require("../../models/AccountSide/account.model");
const TransferBNB = require("../../helpers/bnbTransfer");
const accountHistory = require("../../models/Blockchain/bnbHistory");
const AdminFeeHistory = require("../../models/AdminSide/adminFeeHistory");
const Referral = require("../../models/Other/referral.model");
const User = require("../../models/AuthSide/user.model");
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");
const tranhistory = require("../../models/Blockchain/bnbHistory");

class bnbTransferController {
    static sendBNB(req, res, next) {
        console.log(
            "Masuk sendCodeo =========================================================="
        );
        let user = req.decoded.id;
        let { myValue, toAddress, adminValue, text } = req.body;
        let fundAccount;
        Account.findOne({ user })
            .then(async function (account) {
                req.myAccount = account;
                fundAccount = account.ETH;
                let key = JSON.parse(JSON.stringify(account.key));
                let newKey = await decryptAccount(key);
                return TransferBNB(toAddress, myValue, newKey);
            })
            .then(function (trx) {
                console.log("ini", trx);
                return accountHistory
                    .create({
                        from: fundAccount,
                        transaction_id: trx,
                        transaction_status: true,
                        value: myValue,
                        to: toAddress,
                        user: user,
                        link: `https://etherscan.io/address/${fundAccount}`,
                        description: "success",
                        ket: text,
                    })
                    .then(function (history) {
                        next();
                    });
            })
            .catch((err) => {
                let hash = "none";
                let desc;
                if (
                    err.message ===
                    "Returned error: insufficient funds for gas * price + value"
                ) {
                    res
                        .status(500)
                        .json({ message: "insufficient funds for gas * price + value" });
                    desc = "insufficient funds for gas * price + value";
                }
                console.log(err);
                return accountHistory
                    .create({
                        from: fundAccount,
                        transaction_id: hash,
                        transaction_status: false,
                        value: myValue,
                        to: toAddress,
                        user: user,
                        description: desc,
                        link: `https://etherscan.io/address/${fundAccount}`,
                        ket: text,
                    })
                    .then(function (history) {
                        next(err);
                    })
                    .catch((err) => {
                        res.status(200).json({ message: "Sending Failed" });
                    });
            });
    }

    static async sendAdminBNB(req, res, next) {
        console.log(
            "Masuk sendAdminCodeo =========================================================="
        );
        let { adminValue } = req.body;
        let myAccount = req.myAccount;
        let newKey = JSON.parse(JSON.stringify(myAccount.key));
        let key = await decryptAccount(newKey);
        let adminETH;
        Account.findOne({ role: "admin" })
            .then(async function (account) {
                let toAddress = account.ETH;
                adminETH = account.ETH;
                console.log(
                    adminETH,
                    "ADMIN ETH -========================================================="
                );
                return TransferBNB(toAddress, adminValue, key);
            })
            .then(function (trxid) {
                return AdminFeeHistory.create({
                    transaction_id: trxid,
                    transaction_status: true,
                    value: adminValue,
                    from: req.decoded.username,
                    admin_address: adminETH,
                });
            })
            .then(function (trans) {
                console.log(
                    trans,
                    "TRANS ADMIN ========================================="
                );
                next();
            })
            .catch((err) => {
                let hash = "none";
                AdminFeeHistory.create({
                    transaction_id: hash,
                    transaction_status: false,
                    value: adminValue,
                    from: req.decoded.id,
                    admin_address: adminETH,
                })
                    .then(function (trans) {
                        res.status(200).end();
                    })
                    .catch((err) => {
                        res.status(200).end();
                    });
            });
    }

    static referralStorage(req, res, next) {
        let refUser = req.refUser;
        if (refUser) {
            User.findOne({ username: refUser.user })
                .then(function (user) {
                    return Referral.create({
                        user: user.id,
                        ref_amount: refUser.refValue,
                    });
                })
                .then(function (ref) {
                    next();
                })
                .catch(next);
        } else {
            next();
        }
    }

    static storeHistoryTransaction(req, res, next) {
        let events = req.events;
        TransactionHistory.find({})
            .then(function (trans) {
                if (trans.length == 0) {
                    return TransactionHistory.create({ transactions: events });
                } else {
                    let id = trans[0].id;
                    return TransactionHistory.updateOne(
                        { _id: id },
                        { transactions: events }
                    );
                }
            })
            .then(function (trasactionhistory) {
                res.end();
            })
            .catch(next);
    }
}

module.exports = bnbTransferController;
