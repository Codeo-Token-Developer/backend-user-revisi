const Account = require("../../models/AccountSide/account.model");
const TransferCodeo = require("../../helpers/codeoTransfer");
const TransactionHistory = require("../../models/Other/transactionHistory.model");
const accountHistory = require("../../models/AccountSide/accountHistory.model");
const AdminFeeHistory = require("../../models/AdminSide/adminFeeHistory");
const Referral = require("../../models/Other/referral.model");
const User = require("../../models/AuthSide/user.model");
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");
const tranhistory = require("../../models/Blockchain/tokenHistory");

class CodeoTransferController {
  static sendCodeo(req, res, next) {
    console.log(
      "Masuk sendCodeo =========================================================="
    );
    let userId = req.decoded.id;
    let { myValue, toAddress, adminValue, text } = req.body;
    Account.findOne({ user:userId })
      .then(async function (account) {
        req.myAccount = account;
        let key = JSON.parse(JSON.stringify(account.key));
        let newKey = await decryptAccount(key);
        return TransferCodeo(toAddress, myValue, newKey, userId)
      })
      .then(function (history) {
        console.log(history)
        next();
      })
      .catch((err) => {
        let hash = "none";
        let desc;
        if (
          err.message ===
          "Returned error: insufficient funds for gas * price + value"
        ) {
          desc = "insufficient funds for gas * price + value";
        }
      });
  }

  static async sendAdminCodeo(req, res, next) {
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
        return TransferCodeo(toAddress, adminValue, key);
      })
      .then(function (data) {
        let events = data[data.length - 1];
        return AdminFeeHistory.create({
          transaction_id: events.transactionHash,
          transaction_status: true,
          value: adminValue,
          from: req.decoded.id,
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
            res.status(500).end();
          })
          .catch((err) => {
            res.status(500).end();
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

module.exports = CodeoTransferController;



// let histran = {
//   transactionHash: myHistory.transactionHash,
//   from:account.ETH,
//   to: toAddress,
//   amounts: myValue,
//   massage: text,
//   link: `https://etherscan.io/address/${account.ETH}`,
//   date: Date.now()
// }

// .then( tranhistory.findOneAndUpdate(
//   { user: userId },
//   { $push: { History: histran } },
//   { new: true }
// ))