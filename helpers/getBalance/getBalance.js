const Web3 = require("web3");
const rpcURL = process.env.INFURA; // Your RCP URL goes here
const web3 = new Web3(rpcURL);
const abi = require("./ABI");
const CODEO = process.env.CODEO;

const contract = new web3.eth.Contract(abi, CODEO);

const getBalance = (address) => {
    return new Promise((resolve, reject) => {
        contract.methods.balanceOf(address).call((err, result) => {
            if (err) {
                reject(err)
            }else {
                resolve(result);
            }
        })
    })
};

module.exports = getBalance;


