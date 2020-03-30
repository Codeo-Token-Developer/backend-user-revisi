const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

const encryptAccount = async (key) => {
    try {
        let account = await web3.eth.accounts.encrypt(key, process.env.ENCRYPT);
        return account;
    } catch (error) {
       console.log(error)
    }
};

module.exports = {
    encryptAccount
}