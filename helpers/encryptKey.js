const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/2acd67a7a87446fabc0602afcff6eff4"
  )
);
require("dotenv").config();

const ENC_KEY = process.env.SECRET;

const encryptAccount = async (key) => {
  try {
    let account = await web3.eth.accounts.encrypt(key, ENC_KEY);
    return account;
  } catch (error) {
    return error;
  }
};

const decryptAccount = async (key) => {
  console.log(key);
  try {
    let account = await web3.eth.accounts.decrypt(key, ENC_KEY);
    return account;
  } catch (error) {
    return error;
  }
};

module.exports = {
  encryptAccount,
  decryptAccount,
};
