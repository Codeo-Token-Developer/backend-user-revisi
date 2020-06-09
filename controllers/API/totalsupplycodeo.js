const codeo = require("../../models/totalsupply");
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const abi = require("./ABI/ABIcodeo");
const codeoCon = '0x46b4a7d906F1A943b7744Df23625E63726d79035'
const contract = new web3js.eth.Contract(abi, codeoCon);
const nonSupplyAddress = "0x449324d64cf250e63bf2854c5484f92a09cb4442"

class codeototal {
    static info(req, res, next) {
        contract.methods.totalSupply().call((err, result) => {
            let hasil = result / 1e18
            return codeo
                .findOneAndUpdate(
                    { _id: '5eda2853c15c746e4cdd8e8c' },
                    {
                        totalSupply: hasil,
                        symbol: 'CODEO',
                    },
                    { new: true }
                )
                .then(function (payload) {
                    let total = {
                        totalSupply: payload.totalSupply,
                        symbol: payload.symbol
                    }
                    res.status(202).json({
                        total,
                        status: 202,
                    });
                })
                .catch(next);
        })
    }

    static buat(req, res, next) {
        contract.methods.totalSupply().call((err, result) => {
            let hasil = result / 1e18
            return codeo
                .create({
                    totalSupply: hasil,
                    symbol: 'CODEO',
                })
                .then(function (payload) {
                    res.status(202).json({
                        payload,
                        status: 202,
                    });
                })
                .catch(next);
        })
    }
}

module.exports = codeototal;