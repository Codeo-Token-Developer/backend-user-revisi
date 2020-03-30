const { verifytoken } = require('../helpers/jwttoken');
const User = require('../models/AuthSide/user.model');

function userAuthentication(req,res,next) {
    let token = req.headers.jwttoken;
    verifytoken(token, function (err, decoded) {
        if (err) {
            next({message: `You must login fist as user`})
        }else if (decoded) {
            req.decoded = decoded;
            next();
        }
    })
};

function userAuthorization(req,res,next) {
    let userId = req.decoded.id;
};

function verificationCheck(email) {
    User.findOne({email})
        .then(function(user) {
            if (user.verification) {
                return true;
            }else {
                return false;
            }
        })
}


module.exports = {
    userAuthentication,
    userAuthorization,
    verificationCheck
}