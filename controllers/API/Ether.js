const KEY_APIS = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const eth = require("../../models/Blockchain/ether");
const ethhistory = require("../../models/Blockchain/ethhistory");
const Account = require("../../models/AccountSide/account.model");
const axios = require("axios").default;
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const headers = { "Content-Type": "application/json", "x-api-key": KEY_APIS };
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");

class ether {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        web3js.eth.getBalance(addressEth, (err, wei) => {
          return eth.findOneAndUpdate(
            { user: userId },
            {
              balance: web3js.utils.fromWei(wei, 'ether'),
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
        })
      } else {
        axios({
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/balance`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return eth.create({
              user: userId,
              balance: data.payload.balance
            });
          })
          .then(function (payload) {
            res.status(202).json({
              message: "success",
              payload,
              status: 202,
            });
          })
          .catch(next);
      }
    });
  }

  static history(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    ethhistory.findOne({ user: userId }).then(function (user) {
      if (user) {
        axios({
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/transactions?index=0&limit=100`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            for (let i = 0; i < data.payload.length; i++) {
              let baru = Number(data.payload[i].value) / 1e18;
              data.payload[i].value = baru;
            }
            return ethhistory.findOneAndUpdate(
              { user: userId },
              {
                History: data.payload,
              },
              { new: true }
            );
          })
          .then(function (payload) {
            res.status(202).json({
              message: "success",
              payload,
              status: 202,
            });
          })
          .catch(next);
      } else {
        axios({
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/transactions?index=0&limit=100`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            for (let i = 0; i < data.payload.length; i++) {
              let baru = Number(data.payload[i].value) / 1e18;
              data.payload[i].value = baru;
            }
            return ethhistory.create({ user: userId, History: data.payload });
          })
          .then(function (payload) {
            res.status(202).json({
              message: "success",
              payload,
              status: 202,
            });
          })
          .catch(next);
      }
    });
  }

  static transfer(req, res, next) {
    let addressEth = req.params.Address;
    let user = req.decoded.id;
    let { toAddress, value } = req.body;
    Account.findOne({ user }).then(async function (account) {
      let key = JSON.parse(JSON.stringify(account.key));
      let newKey = await decryptAccount(key);
      console.log(newKey.privateKey);
      axios({
        url: `${apiUrl}bc/eth/mainnet/txs/new-pvtkey`,
        method: "POST",
        headers,
        data: {
          fromAddress: addressEth,
          toAddress: toAddress,
          gasPrice: 57e9,
          gasLimit: 31000,
          value: Number(value),
          privateKey: newKey.privateKey,
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


module.exports = ether;
