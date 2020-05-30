const axios = require("axios");
const API_KEY = process.env.API_KEY;
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };
const NETWORK = "mainnet";
const apiUrl = `${process.env.API_URL}/${NETWORK}`;

class Address {
  static getAddressDetail(address) {
    axios({
      url: `${apiUrl}/address/${address}`,
      method: "GET",
      headers,
    })
      .then(({ data }) => {
        return data.payload;
      })
      .catch((err) => {});
  }

  static getBasicTransaction(address, index, limit) {
    axios({
      url: `${apiUrl}/address/${address}/basic/transaction?index=${index}&limit=${limit}`,
      method: "GET",
      headers,
    })
      .then(({ data }) => {})
      .catch((err) => {});
  }

  static generateAddress() {
    axios({
      url: `${apiUrl}/address`,
      method: "POST",
      headers,
    })
      .then(({ data }) => {
        console.log(data);
        return data.payload;
      })
      .catch((err) => {
        let newError = err.meta.err.message;
        return newError;
      });
  }

  // {
  //     "meta": {
  //         "error": {
  //             "code": 6001,
  //             "message": "Asset not found"
  //         }
  //     }
  // }

  static generateAccount() {}
}

module.exports = Address;
