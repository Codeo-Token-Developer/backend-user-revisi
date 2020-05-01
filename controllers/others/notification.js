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
        notif.find({user:[user,'5eac9987d75a09608cff4881']})
            .then(function (notifi) {
                res.status(200).json({notifi, status: 200})
            })
            .catch(next);
    };
}

module.exports = notifController;