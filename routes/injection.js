const express = require('express');
const Router = express.Router();

const User = require('../models/AuthSide/user.model');
const Account = require('../models/AccountSide/account.model');
const Web3 = require("web3");
// var Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/2acd67a7a87446fabc0602afcff6eff4"));
// let { CODEO, ENCRYPT } = process.env;
// Router.patch('/', function (req,res,next) {
//     let user = '5e81bc34f00a5233100cd103'
//     User.updateOne({_id: user}, {verification: true})
//         .then(function() {
//             res.send('Oke')
//         })
//         .catch(next)
// })

Router.post('/', function (req,res,next) {
    let user = '5e81bbcaf00a5233100cd100'
    let ETH = '0x94fe5890Ec13F72D3fEeF42B34c0ccc2B0F01e29';
    let key =  {
      version: 3,
      id: 'd88c23aa-53e5-42b4-9af4-4dce11f16dcb',
      address: '8f4a0ebea683a7f8fcb60c6530dba0833a26f413',
      crypto: {
        ciphertext: '9890b4735fa53abde24f9570e661e1c4bb30aeaad2952263eea91ceabccf5aad',
        cipherparams: { iv: '9ad20a99156ea021f851994cbbdf1ab7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
          dklen: 32,
          salt: 'b0bf22be73f0f90d2731ccd01231a6bda5d276915413a51e07b6b63da3b01826',
          n: 8192,
          r: 8,
          p: 1
        },
        mac: '821098dc3ff205d2f391195535615cbae8e1e83d77b5a4f4ae9e46198bd86bc6'
      }
    };
    let myAccount;

    web3.eth.getBalance(ETH)
    .then(function (data) {
        balance = data;
        return Account.create({
            ETH,
            key: JSON.stringify(key),
            user
        })
    })
    .then(function(account) {
        myAccount = account;
        return User.updateOne({_id: user}, { account: myAccount.id }) 
    })
    .then(function() {
        res.status(200).json(myAccount);
    })
    .catch(next);

})

Router.patch('/', function (req,res,next) {
  User.updateOne({_id: '5e81bbf4f00a5233100cd101'}, {ref: 'laskarks'})
    .then(function() {
      res.status(201).json({messag: 'Hallo success'})
    })
    .catch(next);
})

Router.get('/', function (req,res,next) {
  User.findOne({ref: 'laskarks'})
    .then(function (user) {
      res.json(user)
    })
    .catch(next)
})


module.exports = Router;