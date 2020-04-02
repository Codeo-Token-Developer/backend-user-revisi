const jwt = require('jsonwebtoken');
const secret = 'owlKing'

function generateToken(payload) {
    return jwt.sign(payload, secret)
};

function generateLoginToken(payload) {
    return jwt.sign(payload, secret)
}

function verifytoken(token, cb) {
    return jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            cb(err, null)
        }else {
            cb(null, decoded)
        }
    })
};

module.exports = {
    generateToken,
    verifytoken,
    generateLoginToken
}