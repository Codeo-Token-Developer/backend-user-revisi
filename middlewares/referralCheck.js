const User = require('../models/AuthSide/user.model');
function refCheck(req,res,next) {
    let user = req.decoded.id;
    let adminValue = Number(req.body.adminValue);
    let { ref } = req.body;
    if (ref) {
        User.findOne({username: ref})
            .then(function(user) {
                let refValue = 0.2 * adminValue;
                let payload = {user, refValue}
                req.refUser = payload;
                next();
            })
            .catch(next);
    }else {
        next();
    }

};

module.exports = refCheck;