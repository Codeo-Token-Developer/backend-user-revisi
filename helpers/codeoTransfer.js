const Web3 = require("web3");
var Tx = require('ethereumjs-tx');
const Referral = require("../models/Other/referral.model");
const contractABI = require("../controllers/API/ABI/ABIcodeo")
const client = require("../models/AccountSide/account.model")

var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
let { CODEO, ENCRYPT } = process.env;

async function TransferCodeo(toAddress, value, key) {

    let minus = 0 - Number(value)
    return new Promise((resolve, reject) => {

        let receipt;

        console.log('Masuk Transfer')

        //let PRIVATE_KEY = web3js.eth.accounts.decrypt(
        //  key,
        //   ENCRYPT
        //);
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
            // let change = howMuch * 1000000;
            // let amoung = (change * 1000000000000).toString();
            let amount = web3js.utils.toHex(web3js.utils.toWei(howMuch))
            let rawTransaction = {
                from: myAddress,
                gasPrice: web3js.utils.toHex(45 * 1e9),
                gasLimit: web3js.utils.toHex(65000),
                to: contractAddress,
                value: 0,
                data: mytt.methods.transfer(toAddress, amount).encodeABI(),
                nonce: web3js.utils.toHex(count)
            };
            let transaction = new Tx(rawTransaction);
            transaction.sign(privateKey);
            web3js.eth
<<<<<<< HEAD
                .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
                .on("transactionHash", console.log)
                .then(function (myReceipt) {
                    receipt = myReceipt;
                    mytt.methods
                        .balanceOf(myAddress)
                        .call()
                        .then(function (balance) {
                            mytt.getPastEvents("Transfer", { fromBlock: 1, toBlock: "latest" }, function (err, events) {
                                if (err) {
                                    reject({ errors: err, receipt });
                                } else {
                                    resolve(events).then(client.findOne({ ETH: toAddress }).then(function (acc) {
                                        return Referral.findOneAndUpdate(
                                            { user: acc.user },
                                            {
                                                $inc: {
                                                    ref_amount: minus
                                                }
                                            }, { new: true })
                                    }))
                                }
                            })
                        })
                })
                .catch(err => {
||||||| e2d5415
                .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
                .on("transactionHash", console.log)
                .then(function (myReceipt) {
                    receipt = myReceipt;
                    mytt.methods
                        .balanceOf(myAddress)
                        .call()
                        .then(function (balance) {
                            mytt.getPastEvents("Transfer", { fromBlock: 1, toBlock: "latest" }, function (err, events) {
                                if (err) {
                                    reject({ errors: err, receipt });
                                } else {
                                    resolve(events);
                                }
                            })
                        })
                })
                .catch(err => {
=======
                .sendSignedTransaction("0x" + transaction.serialize().toString("hex"),(err, txHash) => {
                    // Now go check etherscan to see the transaction!
                    console.log(txHash)
                    if (err) {
                        reject({ errors: err, receipt });
                    } else {
                        resolve(txHash);
                    }
                  }).catch(err => {
>>>>>>> 92d2ccac33023b6387f82014151ce72aea937c19
                    reject(err)
                })
        })
    })
};

module.exports = TransferCodeo;