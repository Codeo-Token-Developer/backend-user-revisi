const Web3 = require("web3");
var Tx = require("ethereumjs-tx");


var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
let { CODEO, ENCRYPT } = process.env;

async function TransferETH(toAddress, value, key) {
    return new Promise((resolve, reject) => {
        let receipt;

        console.log("Masuk Transfer");

        let myAddress = key.address;
        let PriKey = key.privateKey.slice(2);
        let privateKey = Buffer.from(PriKey, "hex");
        let valuefix = String(value);
        web3js.eth.getTransactionCount(myAddress, (err, txCount) => {
            // Build the transaction
            const txObject = {
                nonce: web3js.utils.toHex(txCount),
                to: toAddress,
                value: web3js.utils.toHex(web3js.utils.toWei(valuefix, 'ether')),
                gasLimit: web3js.utils.toHex(31000),
                gasPrice: web3js.utils.toHex(web3js.utils.toWei('50', 'gwei'))
            }

            // Sign the transaction
            const tx = new Tx(txObject)
            tx.sign(privateKey)
            const serializedTx = tx.serialize()
            const raw = '0x' + serializedTx.toString('hex')
            web3js.eth.sendSignedTransaction(raw, (err, txHash) => {
                console.log('txHash:', txHash)
                // Now go check etherscan to see the transaction!
                if (err) {
                    //   console.log("Error masuk!");
                    reject(err);
                } else {
                    resolve(txHash);
                }
            }
            );
        })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = TransferETH;
