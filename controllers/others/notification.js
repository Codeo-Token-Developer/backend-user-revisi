const notif = require('../../models/Other/notification');

class notifController {

    static readAll(req,res,next) {
        notif.find({})
            .then(function (notifs) {
                res.status(200).json({notifs, status: 200})
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let user = req.decoded.id;
        notif.find({user})
            .then(function (notifi) {
                res.status(200).json({notifi, status: 200})
            })
            .catch(next);
    };
}

module.exports = notifController;