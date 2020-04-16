const Web3 = require("web3");
var Tx = require("ethereumjs-tx");
let abi = require("../ABI/ABI");

var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
let { CODEO, ENCRYPT } = process.env;

async function TransferCodeo(toAddress, value) {
  return new Promise((resolve, reject) => {
    let key1 = {
      version: 3,
      id: "dfbd89c6-6bb5-4f1f-8a71-48dae9b59376",
      address: "7c19ad2e7692d2c540df021d10eae83dae9b5268",
      crypto: {
        ciphertext:
          "57f98ff0b85b121733d14f65631ea3e1926dc9604807fbb24e6a6c788e989ca5",
        cipherparams: {
          iv: "7c00c354a9c4774da450cf26bbe950f5"
        },
        cipher: "aes-128-ctr",
        kdf: "scrypt",
        kdfparams: {
          dklen: 32,
          salt:
            "37d2834ec1d4f566a91e48d323d04d38130e738ca6ef02400b1add5fcf22f478",
          n: 8192,
          r: 8,
          p: 1
        },
        mac: "25d2d98791a883494d50b161c95c696a531442a6ac090407bee8c75202e7ec0d"
      }
    };
    let PRIVATE_KEY = web3js.eth.accounts.decrypt(key1, ENCRYPT);
    let myAddress = key1.address;
    let PriKey = PRIVATE_KEY.privateKey.slice(2);
    let privateKey = Buffer.from(PriKey, "hex");
    //contract abi is the array that you can get from the ethereum wallet or etherscan
    let contractABI = abi;

    let contractAddress = CODEO;

    //creating contract object
    let mytt = new web3js.eth.Contract(contractABI, contractAddress);
    web3js.eth.getTransactionCount(myAddress).then(function(v) {
      count = v;
      let howMuch = Number(value);
      let change = howMuch * 1000000;
      let amoung = (change * 1000000000000).toString();
      let amount = web3js.utils.toHex(amoung);
      let rawTransaction = {
        from: myAddress,
        gasPrice: web3js.utils.toHex(8 * 1e9),
        gasLimit: web3js.utils.toHex(60000),
        to: contractAddress,
        value: 0,
        data: mytt.methods.transfer(toAddress, amount).encodeABI(),
        nonce: web3js.utils.toHex(count)
      };
      let transaction = new Tx(rawTransaction);
      transaction.sign(privateKey);
      web3js.eth
        .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
        .on("transactionHash", console.log)
        .then(function(receipt) {
          // mytt.methods
          //   .balanceOf(myAddress)
          //   .call()
          mytt.getPastEvents(
            "Transfer",
            { fromBlock: 1, toBlock: "latest" },
            function(err, events) {
              if (err) {
                reject(err);
              } else {
                resolve(events);
              }
            }
          );
        });
    });
  });
}

module.exports = TransferCodeo;
