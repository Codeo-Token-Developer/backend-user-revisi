const API_KEY = process.env.API_KEY;
const apiUrl = process.env.BASE_URL;
const SECRET = process.env.SECRET;
const ltc = require("../../models/Blockchain/litecoin");
const ltchistory = require("../../models/Blockchain/ltchistory");
const axios = require("axios").default;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const CryptoJS = require("crypto-js");

class Addressltc {
  static readMe(req, res, next) {
    let user = req.decoded.id;
    ltc
      .find({ user })
      .then(function (payload) {
        res.status(200).json({ payload, status: 200 });
      })
      .catch(next);
  }

  static generateAddress(req, res, next) {
    let userId = req.decoded.id;
    ltc.findOne({ user: userId }).then(function (user) {
      if (user) {
        next({ message: "You already have Address" });
      } else {
        axios({
          url: `${apiUrl}bc/ltc/mainnet/address`,
          method: "POST",
          headers,
        })
          .then(({ data }) => {
            return ltc
              .create({
                user: userId,
                address: data.payload.address,
                privateKey: CryptoJS.AES.encrypt(
                  data.payload.privateKey,
                  SECRET
                ),
                publicKey: CryptoJS.AES.encrypt(data.payload.publicKey, SECRET),
                balance: "",
                totalSpent: "",
                totalReceived: "",
                txi: 0,
                txo: 0,
                txsCount: 0,
              })
              .then(ltchistory.create({ History: [], user: userId }));
          })
          .then(function (crypto) {
            res.status(202).json({ message: "success", crypto, status: 202 });
          })
          .catch(next);
      }
    });
  }

  static info(req, res, next) {
    let user = req.decoded.id;
    let addressltc = req.params.Address;
    axios({
      url: `${apiUrl}bc/ltc/mainnet/address/${addressltc}`,
      method: "GET",
      headers,
    })
      .then(({ data }) => {
        return ltc.findOneAndUpdate(
          { user },
          {
            balance: data.payload.balance,
            totalSpent: data.payload.totalSpent,
            totalReceived: data.payload.totalReceived,
            txi: data.payload.txi,
            txo: data.payload.txo,
            txsCount: data.payload.txsCount,
          },
          { new: true }
        );
      })
      .then(function (payload) {
        let info = {
          balance: payload.balance,
          totalSpent: payload.totalSpent,
          totalReceived: payload.totalReceived,
          txi: payload.txi,
          txo: payload.txo,
          txsCount: payload.txsCount,
        };
        res.status(202).json({
          message: "success",
          info,
          status: 202,
        });
      })
      .catch(next);
  }

  static history(req, res, next) {
    let user = req.decoded.id;
    let addressltc = req.params.Address;
    axios({
      url: `${apiUrl}bc/ltc/mainnet/address/${addressltc}/basic/transactions?index=0&limit=50`,
      method: "GET",
      headers,
    })
      .then(({ data }) => {
        return ltchistory.findOneAndUpdate(
          { user },
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
  }

  // static transfer(req, res, next) {
  // }
}

module.exports = Addressltc;
