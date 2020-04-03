const User = require('../../models/AuthSide/user.model');
const LogHistory = require('../../models/Other/logHistory.model');
const Password = require('../../models/AuthSide/password.model')

//Helpers
const { generateToken, verifytoken, generateLoginToken } = require('../../helpers/jwttoken');
const { checkPass, hashPass } = require('../../helpers/hashing');

class UserController {

    static readAll(req,res,next) {
        User.find({})
            .then(function (users) {
                res.status(200).json({users, status: 200})
            })
            .catch(next)
    };

    static create(req,res,next) {
        let { full_name, password, email, username, confirm_password, ref } = req.body;
        let newRef;
        if (ref) {
            newRef = ref
        }

        let referral_address = `dapp.codeotoken.com/ref/${username}`

        if (full_name && password && email && username) {
            if (password !== confirm_password) {
                next({message: `Password and confirm password didn't match`})
            }else {

                User.create({full_name, password, email, username, referral_address: referral_address, ref: newRef})
                .then(function (user) {
                    req.payload = {id: user.id, email: user.email, full_name: user.full_name}
                    next();
                })
                .catch(next)
            }
        }else {
            User.create({full_name, password, email, username, referral_address: referral_address, ref: newRef})
                .then(function (user) {
                    res.status(202).json({user, status: 202})
                })
                .catch(next)
        }

    };

    static login(req,res,next) {
        let { email, password } = req.body;
        let logUser, token;
        User.findOne({email})
            .then(function (user) {
                    if (user.verification) {
                        if (user && checkPass(password, user.password)) {
                            token = generateLoginToken({id: user.id, username: user.username})
                            logUser = user
                            return User.updateOne({_id: user.id},{isLogin: true})
                        }else {
                            next({message: `Invalid email / password`})
                        }   
                    }else {
                        next({message: `Please verification your email first`})
                    }
            })
            .then(function () {
                res.status(201).json({message: `Welcome ${logUser.full_name}, hope you enjoy our services`, token, user: logUser})
            })
            .catch(next)
    };

    static logout(req,res,next) {
        let userId = req.decoded.id;
        User.updateOne({_id: userId}, {isLogin: false, approval_verified: false})
            .then(function() {
                res.status(200).json({message: `See You Later...`, status:200})
            })
            .catch(next)
    };

    static logHistory(req,res,next) {
        let userId = req.decoded.id;
        let { ip, range, country, region, eu, timezone, city, ll, metro, area } = req.body.ipad;
        LogHistory.create({ip, range, country, region, eu, timezone, city, ll, metro, area, user: userId})
            .then(function (logs) {
                res.status(202).json({logs, status: 202})
            })
            .catch(next)
    };

    static readAllLogHistory(req,res,next) {
        LogHistory.find({})
            .then(function (logs) {
                res.status(200).json({logs, status: 200})
            })
            .catch(next);
    };

    static updateVerification(req,res,next) {
        let decoded;
        verifytoken(req.params.token, function (err, data) {
            if (err) {
                next(err)
            }else {
                decoded = data;
                User.updateOne({ _id: decoded.id }, {verification: true})
                .then(function() {
                    res.status(200).redirect("http://dapp.codeotoken.com")
                })
                .catch(next);
            }
        })
    };

    static forgotPassword(req,res,next) {
        let { email } = req.body;
        User.findOne({ email })
            .then(function (user) {
                if (user) {
                    let token = generateToken({id: user.id});
                    req.token = token;
                    req.updateUser = user;
                    next();
                }else {
                    next({ message: 'Email not found' })
                }
            })
            .catch(next);
    };

    
    static changePassword(req, res, next) {
        let { oldPassword, newPassword } = req.body;
        let userId = req.decoded.id;
        User.findOne({_id: userId})
            .then(function(user) {
                req.user = user;
                let check = checkPass(oldPassword, user.password)
                if (check) {
                    return Password.create({password: newPassword, user: userId})
                }else {
                    next({message: `Old Password didn't match with current password`})
                }
            })
            .then(function (pass) {
                next();
            })
            .catch(next);
    }

  static QrUpdate(req, res, next) {
    let userId = req.decoded.id;
    User.updateOne({ _id: userId }, { approval_verified: true })
      .then(function() {
        res.status(201).json({ message: "your 2FA is completed", status: 201 });
      })
      .catch(next);
  }

  static QrLogout(req, res, next) {
    let userId = req.decoded.id;
    User.updateOne({ _id: userId }, {approval_verified:false })
      .then(function() {
        res.status(201).json({ message: "Close 2FA", status: 201 });
      })
      .catch(next);
  }

};

module.exports = UserController;