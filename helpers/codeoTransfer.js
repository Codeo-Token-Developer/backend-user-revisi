const Web3 = require("web3");
var Tx = require('ethereumjs-tx');

var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
let { CODEO, ENCRYPT } = process.env;

async function TransferCodeo (toAddress, value, key) {
        

        return new Promise ((resolve, reject) => {
        
        let receipt;

        let PRIVATE_KEY = web3js.eth.accounts.decrypt(
            key,
            ENCRYPT
        );
        let myAddress = key.address;
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
                        receipt = receipt;
                        mytt.methods
                            .balanceOf(myAddress)
                            .call()
                            .then(function (balance) {
                                mytt.getPastEvents("Transfer", {fromBlock: 1, toBlock: "latest"}, function(err, events) {
                                    if (err) {
                                        reject({errors: err, receipt});
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