const Web3 = require("web3");
var Tx = require('ethereumjs-tx');

var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
let { CODEO, ENCRYPT } = process.env;

async function TransferCodeo (toAddress, value) {
        
        return new Promise ((resolve, reject) => {
        let key1 =   {
            version: 3,
            id: "dfbd89c6-6bb5-4f1f-8a71-48dae9b59376",
            address: "7c19ad2e7692d2c540df021d10eae83dae9b5268",
            crypto: {
              ciphertext: "57f98ff0b85b121733d14f65631ea3e1926dc9604807fbb24e6a6c788e989ca5",
              cipherparams: {
                iv: "7c00c354a9c4774da450cf26bbe950f5"
              },
              cipher: "aes-128-ctr",
              kdf: "scrypt",
              kdfparams: {
                dklen: 32,
                salt: "37d2834ec1d4f566a91e48d323d04d38130e738ca6ef02400b1add5fcf22f478",
                n: 8192,
                r: 8,
                p: 1
              },
              mac: "25d2d98791a883494d50b161c95c696a531442a6ac090407bee8c75202e7ec0d"
            }
          }
        let PRIVATE_KEY = web3js.eth.accounts.decrypt(
            key1,
            ENCRYPT
        );
        let myAddress = key1.address;
        let PriKey = PRIVATE_KEY.privateKey.slice(2);
        let privateKey = Buffer.from(PriKey, "hex");
          //contract abi is the array that you can get from the ethereum wallet or etherscan
        let contractABI = [
            {
            constant: true,
            inputs: [{ name: "interfaceId", type: "bytes4" }],
            name: "supportsInterface",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "mintingFinished",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "approve",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "transferAndCall",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "transferFrom",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [],
            name: "renounceOperator",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [{ name: "account", type: "address" }],
            name: "removeMinter",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [{ name: "", type: "uint8" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "approveAndCall",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "cap",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "addedValue", type: "uint256" }
            ],
            name: "increaseAllowance",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "data", type: "bytes" }
            ],
            name: "transferAndCall",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "mint",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [{ name: "amount", type: "uint256" }],
            name: "burn",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "transferEnabled",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: true,
            inputs: [{ name: "account", type: "address" }],
            name: "isOperator",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: true,
            inputs: [{ name: "account", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "account", type: "address" },
                { name: "amount", type: "uint256" }
            ],
            name: "burnFrom",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [],
            name: "finishMinting",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "tokenAddress", type: "address" },
                { name: "tokenAmount", type: "uint256" }
            ],
            name: "recoverERC20",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "owner",
            outputs: [{ name: "", type: "address" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "isOwner",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [{ name: "account", type: "address" }],
            name: "addMinter",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [],
            name: "renounceMinter",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [{ name: "account", type: "address" }],
            name: "addOperator",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "subtractedValue", type: "uint256" }
            ],
            name: "decreaseAllowance",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "transfer",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [{ name: "account", type: "address" }],
            name: "isMinter",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [{ name: "account", type: "address" }],
            name: "removeOperator",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [],
            name: "builtOn",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "data", type: "bytes" }
            ],
            name: "transferFromAndCall",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "data", type: "bytes" }
            ],
            name: "approveAndCall",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" }
            ],
            name: "transferFromAndCall",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: true,
            inputs: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" }
            ],
            name: "allowance",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
            },
            {
            constant: false,
            inputs: [],
            name: "enableTransfer",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            constant: false,
            inputs: [{ name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
            },
            {
            inputs: [
                { name: "name", type: "string" },
                { name: "symbol", type: "string" },
                { name: "decimals", type: "uint8" },
                { name: "cap", type: "uint256" },
                { name: "initialSupply", type: "uint256" },
                { name: "transferEnabled", type: "bool" }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "constructor"
            },
            { anonymous: false, inputs: [], name: "MintFinished", type: "event" },
            { anonymous: false, inputs: [], name: "TransferEnabled", type: "event" },
            {
            anonymous: false,
            inputs: [
                { indexed: true, name: "previousOwner", type: "address" },
                { indexed: true, name: "newOwner", type: "address" }
            ],
            name: "OwnershipTransferred",
            type: "event"
            },
            {
            anonymous: false,
            inputs: [{ indexed: true, name: "account", type: "address" }],
            name: "OperatorAdded",
            type: "event"
            },
            {
            anonymous: false,
            inputs: [{ indexed: true, name: "account", type: "address" }],
            name: "OperatorRemoved",
            type: "event"
            },
            {
            anonymous: false,
            inputs: [{ indexed: true, name: "account", type: "address" }],
            name: "MinterAdded",
            type: "event"
            },
            {
            anonymous: false,
            inputs: [{ indexed: true, name: "account", type: "address" }],
            name: "MinterRemoved",
            type: "event"
            },
            {
            anonymous: false,
            inputs: [
                { indexed: true, name: "from", type: "address" },
                { indexed: true, name: "to", type: "address" },
                { indexed: false, name: "value", type: "uint256" }
            ],
            name: "Transfer",
            type: "event"
            },
            {
            anonymous: false,
            inputs: [
                { indexed: true, name: "owner", type: "address" },
                { indexed: true, name: "spender", type: "address" },
                { indexed: false, name: "value", type: "uint256" }
            ],
            name: "Approval",
            type: "event"
            }
        ];
        
        let contractAddress = CODEO;

        //creating contract object
        let mytt = new web3js.eth.Contract(contractABI, contractAddress);
        web3js.eth.getTransactionCount(myAddress).then(function (v) {
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
                        mytt.methods
                            .balanceOf(myAddress)
                            .call()
                            .then(function (balance) {
                                mytt.getPastEvents("Transfer", {fromBlock: 1, toBlock: "latest"}, function(err, events) {
                                    if (err) {
                                        reject(err);
                                    }else {
                                        resolve(events);
                                    }
                                })
                            })
                    })
            })
        })
};

module.exports = TransferCodeo;