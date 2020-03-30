const User = require('../../models/AuthSide/user.model');
const { hashPass } = require('../../helpers/hashing');
const Password = require('../../models/AuthSide/password.model');

class PasswordController {

    static updateForgotPassword(req,res,next) {
        let userId = req.params.userId;
        let { newPassword } = req.body;
        let hashing = hashPass(newPassword);

        User.updateOne({_id: userId}, {password: hashing})
            .then(function() {
                res.status(200).json({message: 'Password has been change', status: 200})
            })
            .catch(next)
    };

    static updateChangePassword(req,res,next) {
        let userId= req.params.userId;
        Password.findOne({user: userId})
            .then(function (password) {
                let newPass = password.password;
                return User.updateOne({_id: userId}, {password: newPass})
                    .then(function () {
                        return Password.deleteOne({user: userId})
                            .then(function() {
                                res.redirect(`http://dapp.codeotoken.com`);
                            })
                    })
            })
            .catch(next);
    };


};

module.exports = PasswordController;



