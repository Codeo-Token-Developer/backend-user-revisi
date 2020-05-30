const API_KEY = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET;
const eth = require("../../models/Blockchain/ether");
const ethhistory = require("../../models/Blockchain/ethhistory");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

class ether {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        axios({
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/balance`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return eth.findOneAndUpdate(
              { user: userId },
              {
                balance: data.payload.balance,
                txs_count: data.payload.txs_count,
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
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/balance`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return eth.create({
              user: userId,
              balance: data.payload.balance,
              txs_count: data.payload.txs_count,
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
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/transactions`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
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
          url: `${apiUrl}bc/eth/mainnet/address/${addressEth}/transactions`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
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
    let { toAddress, value, privateKey } = req.body;
    let key = web3js.eth.accounts.decrypt(privateKey, SECRET);
    axios({
      url: `${apiUrl}bc/eth/mainnet/txs/new-pvtkey`,
      method: "POST",
      headers,
      data: {
        fromAddress: addressEth,
        toAddress: toAddress,
        gasPrice: 21000000000,
        gasLimit: 21000,
        value: value,
        privateKey: key.privateKey,
      },
    }).then(({ data }) => {
      res
        .status(202)
        .json({
          message: "success",
          data,
          status: 202,
        })
        .catch(next);
    });
  }
}

module.exports = ether;
