const Web3 = require("web3");
// const rpcURL = process.env.INFURA; // Your RCP URL goes here
const rpcURL = 'https://mainnet.infura.io/v3/2acd67a7a87446fabc0602afcff6eff4';
const web3 = new Web3(rpcURL);
const abi = require("./ABI");
// const CODEO = process.env.CODEO;
const CODEO = '0x46b4a7d906F1A943b7744Df23625E63726d79035'

let myAddress = "0x7c19AD2E7692d2c540df021D10EAe83DaE9B5268";

const contract = new web3.eth.Contract(abi, CODEO);

contract.methods.balanceOf(myAddress).call((err, result) => {
  console.log(result);
});


