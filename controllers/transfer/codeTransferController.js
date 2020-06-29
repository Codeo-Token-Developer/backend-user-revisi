const Account = require("../../models/AccountSide/account.model");
const TransferCodeo = require("../../helpers/codeoTransfer");
const TransactionHistory = require("../../models/Other/transactionHistory.model");
const tranhistory = require("../../models/Blockchain/tokenHistory");
const AdminFeeHistory = require("../../models/AdminSide/adminFeeHistory");
const Referral = require("../../models/Other/referral.model");
const User = require("../../models/AuthSide/user.model");
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");

class CodeoTransferController {
  static sendCodeo(req, res, next) {
    console.log(
      "Masuk sendCodeo =========================================================="
    );
    let user = req.decoded.id;
    let { myValue, toAddress, adminValue, text } = req.body;
    Account.findOne({ user })
      .then(async function (account) {
        req.myAccount = account;
        let key = JSON.parse(JSON.stringify(account.key));
        let newKey = await decryptAccount(key);
        return TransferCodeo(toAddress, myValue, newKey);
      })
      .then(function (events) {
        req.events = events;
        let myHistory = events[events.length - 1];
        let myResult = JSON.parse(JSON.stringify(myHistory.returnValues));
        return tranhistory.create({
          user: user,
          transaction_id: myHistory.transactionHash,
          transaction_status: true,
          from: myResult.from,
          value: Number(myValue),
          to: myResult.to,
          link: `https://etherscan.io/address/${myResult.from}#tokentxns`,
          description: text
        });
      })
      .then(function (history) {
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
        return tranhistory
          .create({
            user: user,
            transaction_id: hash,
            transaction_status: false,
            from: "-",
            value: Number(myValue),
            to: myResult.to,
            link: `failed`,
            description: text
          })
          .then(function (history) {
            next(err);
          })
          .catch((err) => {
            res.status(500).json({ message: "Sending Failed" });
          });
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
