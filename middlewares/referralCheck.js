const User = require('../models/AuthSide/user.model');
function refCheck(req,res,next) {
    let adminValue = Number(req.body.adminValue);
    let user = req.decoded.id;
    let mySendValue = Number(req.body.myValue)
    req.body.myValue = mySendValue;
    User.findOne({_id: user})
        .then(function (user) {
            console.log(user.ref);
            if(user.ref) {
                let refValue = 0.2 * adminValue;
                let payload = {user: user.ref, refValue}
                req.refUser = payload;
                next();
            }else {
                next();
            }
        })
        .catch(next);
};

module.exports = refCheck;