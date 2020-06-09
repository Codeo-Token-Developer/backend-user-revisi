const codeo = require("../../models/infocodeo");
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const abi = require("./ABI/ABIcodeo");
const codeoCon = '0x46b4a7d906F1A943b7744Df23625E63726d79035'
const contract = new web3js.eth.Contract(abi, codeoCon);
const nonSupplyAddress = "0x449324d64cf250e63bf2854c5484f92a09cb4442"

class codeoinfo {
    static info(req, res, next) {
        contract.methods.balanceOf(nonSupplyAddress).call((err, result) => {
            let fix = Number(result) / 1e18
            let hasil = 1000000000000 - fix
            return codeo
                .findOneAndUpdate(
                    { _id: '5ed8c2bfca77672cac4b1fba' },
                    {
                        CirculatingSupply: hasil,
                    },
                    { new: true }
                )
                .then(function (payload) {
                    res.status(202).json({
                        payload,
                        status: 202,
                    });
                })
                .catch(next);
        })
    }

    static buat(req, res, next) {
        contract.methods.balanceOf(nonSupplyAddress).call((err, result) => {
            let fix = Number(result) / 1e18
            let hasil = 1000000000000 - fix
            return codeo
                .create({
                    CirculatingSupply: hasil,
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

module.exports = codeoinfo;