const AccountHistory = require("../../models/AccountSide/accountHistory.model");

class AccountHistoryController {
  static readAll(req, res, next) {
    AccountHistory.find({})
      .then(function (historys) {
        res.status(200).json({ historys, status: 200 });
      })
      .catch(next);
  }

  static readMe(req, res, next) {
    let userId = req.decoded.id;
    AccountHistory.find({ user: userId })
      .then(function (history) {
        res.status(200).json({ history, status: 200 });
      })
      .catch(next);
  }
}

module.exports = AccountHistoryController;
