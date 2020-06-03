const API_KEY = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const eth = require("../../models/Blockchain/tron");
const tranhistory = require("../../models/Blockchain/trxHistory");
const Account = require("../../models/AccountSide/account.model");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const cAddress = "0xf230b790e05390fc8295f4d3f60332c93bed42e2";
const abi = require("./ABI/ABItrx");
const contract = new web3js.eth.Contract(abi, cAddress);
const { encryptAccount, decryptAccount } = require("../../helpers/encryptKey");

class tron {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        contract.methods.balanceOf(addressEth).call((err, result) => {
          console.log(result);
          let sisa = result / 1e6;
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
          console.log(result);
          let sisa = result / 1e18;
          return eth
            .create({
              user: userId,
              balance: sisa,
              symbol: "TRX",
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
    let addressEth = req.params.Address;
    tranhistory.findOne({ user: userId }).then(function (user) {
      if (user) {
        axios({
          url: `${apiUrl}bc/eth/mainnet/tokens/address/${addressEth}/transfers?index=0&limit=100`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            let newData = [];
            for (let i = 0; i < data.payload.length; i++) {
              if (data.payload[i].symbol === "TRX") {
                newData.push(data.payload[i]);
              }
            }
            return tranhistory.findOneAndUpdate(
              { user: userId },
              {
                History: newData,
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
          url: `${apiUrl}bc/eth/mainnet/tokens/address/${addressEth}/transfers?index=0&limit=100`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            let newData = [];
            for (let i = 0; i < data.payload.length; i++) {
              if (data.payload[i].symbol === "TRX") {
                newData.push(data.payload[i]);
              }
            }
            return tranhistory.create({ user: userId, History: newData });
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
      axios({
        url: `${apiUrl}bc/eth/mainnet/tokens/transfer`,
        method: "POST",
        headers,
        data: {
          fromAddress: addressEth,
          toAddress,
          contract: cAddress,
          privateKey: newKey.privateKey,
          gasPrice: 15000000000,
          gasLimit: 100000,
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

module.exports = tron;
