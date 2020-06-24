const Web3 = require("web3");
var Tx = require('ethereumjs-tx');
const tranhistory = require("../models/Blockchain/tokenHistory");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const contractABI = require("../controllers/API/ABI/ABIcodeo")
let { CODEO, ENCRYPT } = process.env;

async function TransferCodeo(toAddress, value2, key, idUser, massage) {


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
            let jumlah = value2.toString()
            // let change = howMuch * 1e18
            let amount = web3js.utils.toHex(web3js.utils.toWei(jumlah))
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
                    console.log(txHash)
                    let histran = {
                        transactionHash: txHash,
                        from: myAddress,
                        to: toAddress,
                        amounts: value2,
                        text: massage,
                        link: `https://etherscan.io/address/${value2}`,
                        date: Date.now()
                    }
                    tranhistory.findOneAndUpdate({ user: idUser }, { $push: { History: [histran] } });
                })
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
                    reject(err)
                })
        })
            .catch(err => {
                reject(err);
            })
    })
};

module.exports = TransferCodeo;