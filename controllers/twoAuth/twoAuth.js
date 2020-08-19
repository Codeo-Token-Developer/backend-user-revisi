const speakeasy = require("speakeasy");
const QRCode = require('qrcode');
const client = require("../../models/AuthSide/user.model")

class twoFA {
    static Generating(req, res, next) {
        let user = req.decoded.id;
        client.findOne({ _id: user }).then((data) => {
            if (data.active2fa === false) {
                let secret = speakeasy.generateSecret({
                    name: data.username + " - archidax.co",
                });
                client.updateOne({ _id: user }, { _2faKey: secret.base32 })
                    .then(QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
                        res.status(202).json({
                            message: "Generate QR Code Success",
                            data_url,
                            status: 202,
                        });
                    })
                    ).catch(next);
            } else {
                res.status(500).json({
                    message: "2FA active",
                    data_url:null,
                    status: 500,
                });
            }
        }).catch(next);
    }

    static Checking2FA(req,res,next){
        let user = req.decoded.id;
        client.findOne({ _id: user }).then(function (users) {
                res.status(202).json({
                    message: `Status 2fa`,
                    status2FA:users.active2fa,
                    statusAuth:users.auths,
                    status: 202,
                });
        }).catch(next)
    }

    static NonActive2FA(req,res,next){
        let user = req.decoded.id;
        let { userToken } = req.body;
        client.findOne({ _id: user }).then(function (users) {
            let verified = speakeasy.totp.verify({
                secret: users._2faKey,
                encoding: 'base32',
                token: userToken
            });
            if (verified === true) {
                    client.updateOne({ _id: user }, { auths: true, active2fa: false, _2faKey:"-" })
                        .then(res.status(202).json({
                            message: ` Your 2FA for ${users.email} Success Nonactivated`,
                            status: 202,
                        })
                        ).catch(next)
            } else {
                res.status(500).json({
                    message: `token 2FA is not match secret key QR Code for ${users.email} `,
                    status: 500,
                });
            }
        }).catch(next)
    }

    static VerifyingToken(req, res, next) {
        let user = req.decoded.id;
        let { userToken } = req.body;
        client.findOne({ _id: user }).then(function (users) {
            let verified = speakeasy.totp.verify({
                secret: users._2faKey,
                encoding: 'base32',
                token: userToken
            });
            if (verified === true) {
                if (users.active2fa === true) {
                    client.updateOne({ _id: user }, { auths: true })
                        .then(res.status(201).json({
                            message: ` Verified 2FA ${users.email} Google Successfull`,
                            status: 201,
                        })
                        ).catch(next)
                } else {
                    client.updateOne({ _id: user }, { auths: true, active2fa: true })
                        .then(res.status(202).json({
                            message: ` Your 2FA for ${users.email} Success, please Confirmation token key`,
                            status: 202,
                        })
                        ).catch(next)
                }
            } else {
                res.status(500).json({
                    message: `token 2FA is not match secret key QR Code for ${users.email} `,
                    status: 500,
                });
            }
        }).catch(next)
    }
}

module.exports = twoFA;