const API_KEY = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET;
const eth = require("../../models/Blockchain/codeo");
const tranhistory = require("../../models/Blockchain/tokenHistory");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

class codeo {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        axios({
          url: `${apiUrl}bc/eth/mainnet/tokens/${addressEth}/0x46b4a7d906F1A943b7744Df23625E63726d79035/balance`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return eth.findOneAndUpdate(
              { user: userId },
              {
                balance: data.payload.token,
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
          url: `${apiUrl}bc/eth/mainnet/tokens/${addressEth}/0x46b4a7d906F1A943b7744Df23625E63726d79035/balance`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return eth.create({
              user: userId,
              balance: data.payload.balance,
              symbol: data.payload.symbol,
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
    tranhistory.findOne({ user: userId }).then(function (user) {
      if (user) {
        axios({
          url: `${apiUrl}bc/eth/mainnet/tokens/address/${addressEth}/transfers`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return tranhistory.findOneAndUpdate(
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
          url: `${apiUrl}bc/eth/mainnet/tokens/address/${addressEth}/transfers`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            return tranhistory.create({ user: userId, History: data.payload });
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
      url: `${apiUrl}bc/eth/mainnet/tokens/transfer`,
      method: "POST",
      headers,
      data: {
        fromAddress: addressEth,
        toAddress,
        contract: "0x46b4a7d906F1A943b7744Df23625E63726d79035",
        privateKey: key.privateKey,
        gasPrice: 21000000000,
        gasLimit: 100000,
        token: value,
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

module.exports = codeo;
