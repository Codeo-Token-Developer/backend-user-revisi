const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/2acd67a7a87446fabc0602afcff6eff4"));

const ENC_KEY = '0xb32e2d6f30c1560f802973ced0ba3927e05f77155428c52e45955f6e6feaba7d2B0F01e29'

const encryptAccount = async (key) => {
    try {
        let account = await web3.eth.accounts.encrypt(key, ENC_KEY);
        return account
    } catch (error) {
       return error
    }
};

const decryptAccount = async (key) => {
    console.log(key)
    try {
        let account = await web3.eth.accounts.decrypt(key, ENC_KEY);
        return account
    } catch (error) {
        return error
    }
}

module.exports = {
    encryptAccount,
    decryptAccount
}