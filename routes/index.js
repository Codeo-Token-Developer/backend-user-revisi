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
const eth = require("./Blockchain/ether");
const cdo = require("./Blockchain/codeo");
const bnb = require("./Blockchain/bnb");
const trx = require("./Blockchain/tron");
const CirculatingSupply = require("./otherRouter/infocodeo");
const CirculatingSupplyNOt = require("./otherRouter/nonbccodeo");
const totalsupply = require("./otherRouter/codeototal");

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

//eth
Router.use("/eth", eth);

//cdo
Router.use("/cdo", cdo);

//bnb
Router.use("/bnb", bnb);

//trx
Router.use("/trx", trx);

//CirculatingSupply
Router.use("/circulatingSupply", CirculatingSupply)

//CirculatingSupplyNOt
Router.use("/circulating-supply", CirculatingSupplyNOt)

//totalsupply
Router.use("/total-supply", totalsupply)

//Topup
Router.use(require("./topup/topupRouter"));

//cms
Router.use("/cms", require("./cmsRouter/cmsRouter.js"));

//LaunchPadnpm
Router.use("/project", require("./launchpadRouter/projectRouter"));

// Exchange
Router.use(require("./exchange/tradeRouter"));


const LimitTrade = require('../models/exchange/limitTrade');
const TradeHistory = require('../models/exchange/tradeHistory');
const Account = require('../models/AccountSide/account.model');
const User = require('../models/AuthSide/user.model');
let AccountId = '5ee6f98579c4920898f1276c';

Router.get('/sec-user', (req,res,next) => {

    let arr = [User.findOne({email: 'handrawanw@gmail.com'}).populate('account'), User.findOne({email: 'laskar.ksatria12@gmail.com'}).populate('account'), User.findOne({email: 'gopokemonnn21@gmail.com'}).populate('account'), User.findOne({email: 'hesa@rocketmail.com'}).populate('account'), User.findOne({email: 'thomas-f-seiei@hotmail.com'}).populate('account') ]

    Promise.all(arr)
        .then(value => {
            res.status(200).json(value);
        })
        .catch(err => {
            res.status(500).json(err);
        })

});

Router.patch('/account-patch', (req,res,next) => {
    let arr = ['5ec36f8b1943286b07edb70b', '5e9d662d43a3c000247aa8c0', '5ea687bccd3fe4002435996b', '5ecdd25332e38c371e9eb0c2', '5e9a9315f53fb013b0647d6b'];
    let newArr = [];
    arr.forEach(id => {
        newArr.push(Account.updateOne({_id: id}, {BTC_coin: 100, balance: 1000000}))
    })
    Promise.all(newArr)
        .then(value => {
            res.status(200).json(value);
        })
        .catch(err => {
            console.log(err);
        })
})


Router.get('/trade-history', (req,res,next) => {
    // TradeHistory.find({})

    //     .then(trades => {
    //         res.status(200).json(trades);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    TradeHistory.deleteMany({})
        .then()
})

Router.delete("/delete-buy",(req,res,next) => {
    LimitTrade.deleteMany({order_type: 'buy'})
        .then(() => {
            res.send("oke")
        })
        .catch(next)
})

Router.patch("/newAccount",(req,res,next) => {
    Account.updateOne({_id: AccountId}, { balance: 10000000, BTC_coin: 100 }, {omitUndefined: true})
        .then(() => {
            res.status(201).json({message: 'Oke'})
        })
        .catch(err => {
            console.log(err)
        })
})





Router.delete('/market-trade', (req,res,next) => {
    TradeHistory.deleteMany({})
        .then(() => {
            res.send('oke')
        })
        .catch(next)   
})

Router.delete("/limit-trade", (req,res,next) => {
    LimitTrade.deleteMany({})
        .then(() => {
            res.send("oke")
        })
        .catch(console.log)
})

module.exports = Router;
