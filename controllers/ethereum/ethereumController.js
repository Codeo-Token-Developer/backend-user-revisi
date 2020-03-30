const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

const getNewAddress = async (cb) => {
    let ethData = {};
    try {
        ethData = await web3.eth.accounts.create(web3.utils.randomHex(700));
        cb(null, ethData);
    }catch (err) {
        ethData.result = err.message
        cb(ethData.result, null)
    }
};


module.exports = {
    getNewAddress
}