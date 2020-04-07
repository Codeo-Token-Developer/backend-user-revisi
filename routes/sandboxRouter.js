const History = require('../models/AccountSide/accountHistory.model');
const Admin = require('../models/AdminSide/adminFeeHistory');
const Ref = require('../models/Other/referral.model');
const User = require('../models/AuthSide/user.model');
const express = require('express');
const Router = express.Router();

Router.delete('/', function (req,res,next) {
    History.deleteMany({})
        .then(function () {
            res.send('oke')
        })
        .catch(next);
})

Router.patch('/', function (req,res,next) {
    let user = "5e8cab61898bb0332078c272";
    User.updateOne({_id: user}, {ref: 'thomas'})
        .then(function () {
            res.send('oke')
        })
        .catch(next)
})

Router.get('/admin', function (req,res,next) {
    Admin.find({})
        .then(function (admin) {
            res.status(200).json(admin)
        })
        .catch(next)
})

Router.get('/ref', function (req,res,next) {
    Ref.find({})
        .then(function (ref) {
            res.status(200).json(ref)
        })
        .catch(next);
})

Router.get('/', function(req,res,next) {
    History.find({})
        .then(function(his) {
            res.status(200).json(his)
        })
        .catch(next);
})

module.exports = Router;