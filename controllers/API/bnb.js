const API_KEY = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET;
const eth = require("../../models/Blockchain/bnb");
const tranhistory = require("../../models/Blockchain/bnbHistory");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const abi = require("./ABI/ABIbnb");
const contract = new web3js.eth.Contract(
  abi,
  "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
);

class bnb {
  static info(req, res, next) {
    var userId = req.decoded.id;
    let addressEth = req.params.Address;
    eth.findOne({ user: userId }).then(function (user) {
      if (user) {
        contract.methods.balanceOf(addressEth).call((err, result) => {
          console.log(result);
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
          console.log(result);
          let sisa = result / 1e18;
          return eth
            .create({
              user: userId,
              balance: sisa,
              symbol: "BNB",
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
          url: `${apiUrl}bc/eth/mainnet/tokens/address/${addressEth}/transfers`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            let newData = [];
            for (let i = 0; i < data.payload.length; i++) {
              if (data.payload[i].symbol === "BNB") {
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
          url: `${apiUrl}bc/eth/mainnet/tokens/address/${addressEth}/transfers`,
          method: "GET",
          headers,
        })
          .then(({ data }) => {
            let newData = [];
            for (let i = 0; i < data.payload.length; i++) {
              if (data.payload[i].symbol === "BNB") {
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
    let { toAddress, value, privateKey } = req.body;
    let key = web3js.eth.accounts.decrypt(privateKey, SECRET);
    axios({
      url: `${apiUrl}bc/eth/mainnet/tokens/transfer`,
      method: "POST",
      headers,
      data: {
        fromAddress: addressEth,
        toAddress,
        contract: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
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

module.exports = bnb;
