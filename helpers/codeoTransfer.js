const Web3 = require("web3");
var Tx = require('ethereumjs-tx');
const contractABI = require("../controllers/API/ABI/ABIcodeo")

var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
let { CODEO, ENCRYPT } = process.env;

async function TransferCodeo(toAddress, value, key) {

    return new Promise((resolve, reject) => {

        let receipt;

        console.log('Masuk Transfer')

        let myAddress = key.address;
        let PriKey = key.privateKey.slice(2);
        let privateKey = Buffer.from(PriKey, "hex");
        //contract abi is the array that you can get from the ethereum wallet or etherscan
        let contractAddress = CODEO;
        //creating contract object
        let mytt = new web3js.eth.Contract(contractABI, contractAddress);
        web3js.eth.getTransactionCount(myAddress).then(function (v) {
            console.log(v)
            count = v;
            let howMuch = value.toString();
            let amount = web3js.utils.toHex(web3js.utils.toWei(howMuch))
            let rawTransaction = {
                from: myAddress,
                gasPrice: web3js.utils.toHex(45 * 1e9),
                gasLimit: web3js.utils.toHex(60000),
                to: contractAddress,
                value: 0,
                data: mytt.methods.transfer(toAddress, amount).encodeABI(),
                nonce: web3js.utils.toHex(count)
            };
            let transaction = new Tx(rawTransaction);
            transaction.sign(privateKey);
            web3js.eth
                .sendSignedTransaction("0x" + transaction.serialize().toString("hex"), (err, txHash) => {
                    console.log('txHash:', txHash)
                    // Now go check etherscan to see the transaction!
                    if (err) {
                        reject({ errors: err.message });
                    } else {
                        resolve(txHash);
                    }
                })
        })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = TransferCodeo;