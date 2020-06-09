const codeo = require("../../models/notbccodeo");
const Web3 = require("web3");
var web3js = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const abi = require("./ABI/ABIcodeo");
const codeoCon = '0x46b4a7d906F1A943b7744Df23625E63726d79035'
const contract = new web3js.eth.Contract(abi, codeoCon);
const nonSupplyAddress = "0x449324d64cf250e63bf2854c5484f92a09cb4442"

class codeoinfo {
    static info(req, res, next) {
        contract.methods.balanceOf(nonSupplyAddress).call((err, result) => {
            let hasil = (1000000000000 * 1e18) - result
            let newcount = (hasil * 1e18)
            return codeo
                .findOneAndUpdate(
                    { _id: '5ed8c4b4b05bac1f08bb81f3' },
                    {
                        CirculatingSupplyDecimal: newcount,
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
            let count = result / 1e18
            let hasil = 1000000000000 - count
            let newcount = hasil * 1e18
            return codeo
                .create({
                    CirculatingSupplyDecimal: newcount,
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