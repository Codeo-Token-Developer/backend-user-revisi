const Topup = require('../../models');
const notif = require('../../models/Other/notification');
const notifAd = require('../../models/Other/notifAdmin');

class TopUpController {

    static create(req,res,next) {
        let user = req.decoded.id;
        let Io = req.Io;
        let { balance } = req.body;
        Topup.create({
            balance,
            user,
        })
        .then(notif.create({text:'TopUp request has been send, check your ballance in view minutes ', user})
            .then(notifs => {
            Io.emit('user-notif', notifs);
            next();
            })
        )
            .then(notifAd.create({text:`${user} make a TopUp request`, user})
                .then(Adnotifs => {
                Io.emit('admin-notif', Adnotifs);
                next();
                })
            )
        .then(topup => {
            res.status(202).json(topup)
        })
        .catch(next)
    };

};

module.exports = TopUpController;