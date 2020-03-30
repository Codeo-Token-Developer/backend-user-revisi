const express = require('express');
const Router = express.Router();
const User = require('../../models/AuthSide/user.model');
const PasswordController = require('../../controllers/user/passwordController');

const Authenticate = (req,res,next) => {
    let userId = req.params.userId;
    User.findOne({_id: userId})
        .then(function (user) {
            if (user) {
                res.redirect(`http://dapp.codeotoken.com/authentication/reset-password/${userId}`);
            }else {
                next({message: 'User not found'})
            }
        })
};

const userChecking = (req,res,next) => {
    let userId = req.params.userId;
    User.findOne({_id: userId})
        .then(function (user) {
            if (user) {
                next()
            }else {
                next({message: 'User not found'})
            }
        })
        .catch(next);
};

//ForgotPassword
//Receive from email
Router.get('/forgotPassword/:userId', Authenticate);
Router.get('/update', Authenticate);
Router.get('/changePassword/:userId', userChecking, PasswordController.updateChangePassword);
Router.get('/:userId',userChecking, PasswordController.updateForgotPassword);

module.exports = Router;