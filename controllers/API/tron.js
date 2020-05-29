const API_KEY = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET;
const eth = require("../../models/Blockchain/tron");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

class tron {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        axios({
          url: `${apiUrl}bc/eth/mainnet/tokens/${addressEth}/0xf230b790e05390fc8295f4d3f60332c93bed42e2/balance`,
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
          url: `${apiUrl}bc/eth/mainnet/tokens/${addressEth}/0xf230b790e05390fc8295f4d3f60332c93bed42e2/balance`,
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
        contract: "0xf230b790e05390fc8295f4d3f60332c93bed42e2",
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

module.exports = tron;
