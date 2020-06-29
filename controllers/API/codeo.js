const KEY_APIS = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const eth = require("../../models/Blockchain/codeo");
const tranhistory = require("../../models/Blockchain/tokenHistory");
const Account = require("../../models/AccountSide/account.model");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": KEY_APIS };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const abi = require("./ABI/ABIcodeo");
const contract = new web3js.eth.Contract(
  abi,
  "0x46b4a7d906F1A943b7744Df23625E63726d79035"
);
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");

class codeo {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        contract.methods.balanceOf(addressEth).call((err, result) => {
          let sisa = result / 1e18;
          return eth
            .findOneAndUpdate(
              { user: userId },
              {
                balance: sisa,
              },
              { new: true }
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
      } else {
        contract.methods.balanceOf(addressEth).call((err, result) => {
          let sisa = result / 1e18;
          return eth
            .create({
              user: userId,
              balance: sisa,
              symbol: "CODEO",
            })
            .then(function (payload) {
              res.status(202).json({
                message: "success",
                payload,
                status: 202,
              });
            })
            .catch(next);
        });
      }
    });
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
          contract: "0x46b4a7d906F1A943b7744Df23625E63726d79035",
          privateKey: newKey.privateKey,
          gasPrice: 40e9,
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

module.exports = codeo;
