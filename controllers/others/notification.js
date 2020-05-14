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

    static updateRead(req,res,next) {
        console.log(req.params.notifId);
        let notifId = req.params.notifId;
        notif.updateOne({_id: notifId}, {read: true})
            .then(() => {
                res.status(201).json({message: 'News has been read'})
            })
            .catch(err => res.status(500).json({message: "Upps, Something going wrong"}))
    };

}

module.exports = notifController;