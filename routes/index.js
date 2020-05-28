const express = require("express");
const Router = express.Router();

//Sub Route
const users = require("./userRouter/user.route");
const accounts = require("./accountRouter/account.route");
const logHistory = require("./otherRouter/logHistory.route");
const fromEmail = require("./emailRouter/fromEmail.route");
const historyRouter = require("./otherRouter/history.route");
const kycRouter = require("./otherRouter/kyc.route");
const creditCardRouter = require("./otherRouter/creditCard.route");
const cryptoRouter = require("./otherRouter/crypto.route");
const transferRouter = require("./transferRouter/transfer.route");
const bankAccountRouter = require("./otherRouter/bankAccount.route");
const feeRouter = require("./otherRouter/fee.route");
const injectionRouter = require("./injection");
const sandboxRouter = require("./sandboxRouter");
const notif = require("./otherRouter/notification");
const btc = require("./Blockchain/bitcoin");
const ltc = require("./Blockchain/litecoin");

Router.use("/injection", injectionRouter);
Router.use("/sandbox", sandboxRouter);

//User Router
Router.use("/users", users);

//AccountRouter
Router.use("/accounts", accounts);
Router.use("/logHistory", logHistory);

//Transfer
Router.use("/transfer", transferRouter);

//OtherRouter
Router.use("/crypto", cryptoRouter);
Router.use("/credit-card", creditCardRouter);
Router.use("/kyc", kycRouter);
Router.use("/history", historyRouter);
Router.use("/api", fromEmail);
Router.use("/fee", feeRouter);
Router.use("/bankAccount", bankAccountRouter);

Router.use("/notif", notif);

// bit
Router.use("/btc", btc);

//lite
Router.use("/ltc", ltc);

//Topup
Router.use(require("./topup/topupRouter"));

//cms
Router.use("/cms", require("./cmsRouter/cmsRouter.js"));

//LaunchPadnpm
Router.use("/project", require("./launchpadRouter/projectRouter"));

//Exchange
Router.use(require("./exchange/tradeRouter"));

// const Trade = require("../models/exchange/Trade");
// const Account = require("../models/AccountSide/account.model");

// Router.patch("/account-test/:userId", (req, res, next) => {
//   let user = req.params.userId;
//   Account.updateOne({ user }, { balance: 500000 })
//     .then(() => {
//       res.send("Hallo");
//     })
//     .catch(next);
// });

// Router.delete("/trade", (req, res, next) => {
//   Trade.deleteMany({})
//     .then(() => {
//       res.send("Delete");
//     })
//     .catch(next);
// });

module.exports = Router;

// Router.use(require("./exchange/Trade"));

// //Trade
// Router.use(require("./exchange/tradeRouter"));

// const Trade = require("../models/exchange/limitTrade");
// const Account = require("../models/AccountSide/account.model");

// Router.patch("/account-update/:userId", (req, res, next) => {
//   Account.updateOne(
//     { user: req.params.userId },
//     { BTC_coin: 10 },
//     { omitUndefined: true }
//   )
//     .then(() => {
//       res.status(201).json({ message: "Has been executed" });
//     })
//     .catch(next);
// });

// Router.delete("/limit", (req, res, next) => {
//   Trade.deleteMany({})
//     .then(() => {
//       res.send("has been deleted");
//     })
//     .catch(next);
// });

// module.exports = Router;
