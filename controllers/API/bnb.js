const KEY_APIS = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const tranhistory = require("../../models/Blockchain/bnbHistory");
const Account = require("../../models/AccountSide/account.model");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": KEY_APIS };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const abi = require("./ABI/ABIbnb");
const cAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
const contract = new web3js.eth.Contract(abi, cAddress);
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");

class bnb {
  static info(req, res, next) {
    var userId = req.decoded.id;
    Account.findOne({ user: userId }).then(function (user) {
      contract.methods.balanceOf(user.ETH).call((err, result) => {
        console.log(result);
        let sisa = result / 1e18;
        return Account
          .findOneAndUpdate(
            { user: userId }, { BNB_coin: sisa, }, { new: true }
          )
          .then(function (payload) {
            res.status(202).json({
              message: "success",
              payload,
              status: 202,
            });
          })
          .catch(next);
      });
    })
  }

  static history(req, res, next) {
    var userId = req.decoded.id;
    tranhistory.find({ user: userId })
      .then(function (History) {
        res.status(202).json({
          message: "success",
          History,
          status: 202,
        });
      })
      .catch(next);
  }

  static transfer(req, res, next) {
    let addressEth = req.params.Address;
    let user = req.decoded.id;
    let { toAddress, value } = req.body;
    Account.findOne({ user }).then(async function (account) {
      let key = JSON.parse(JSON.stringify(account.key));
      let newKey = await decryptAccount(key);
      axios({
        url: `${apiUrl}bc/eth/mainnet/tokens/transfer`,
        method: "POST",
        headers,
        data: {
          fromAddress: addressEth,
          toAddress,
          contract: cAddress,
          privateKey: newKey.privateKey,
          gasPrice: 30e9,
          gasLimit: 42370,
          token: Number(value),
        },
      })
        .then(({ data }) => {
          res.status(202).json({
            message: "success",
            data,
            status: 202,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error.response.data.meta.error.message,
            status: 400,
          });
        });
    });
  }
}

module.exports = bnb;
