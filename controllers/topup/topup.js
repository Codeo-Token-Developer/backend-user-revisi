const Topup = require('../../models');

class TopUpController {

    static create(req,res,next) {
        let user = req.decoded.id;
        let { balance } = req.body;
        Topup.create({
            balance,
            user,
        })
        .then(topup => {
            res.status(202).json(topup)
        })
        .catch(next)
    };

};

module.exports = TopUpController;