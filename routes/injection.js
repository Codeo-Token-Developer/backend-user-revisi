const express = require('express');
const Router = express.Router();

const User = require('../models/AuthSide/user.model');
const Account = require('../models/AccountSide/account.model');
const Web3 = require("web3");
const AccountController = require('../controllers/account/accountController')
// var Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/2acd67a7a87446fabc0602afcff6eff4"));
// let { CODEO, ENCRYPT } = process.env;
const { decryptAccount, encryptAccount } = require('../helpers/encryptKey')


Router.post('/', (req,res,next) => {
  console.log('Masuk')
  let user = '5e8caba7898bb0332078c273';
  let payload = {id: user}
  req.decoded = payload
  next();
}, AccountController.create)

Router.get('/', (req,res,next) => {
  let user = '5e8ca516898bb0332078c270';
  Account.findOne({user})
    .then( async function (account) {
      let key = await encryptAccount(account.key);
      console.log(key)
      res.status(200).json({key}) 
    })
    .catch(next)
})

Router.delete('/', (req,res,next) => {
  let account = '5e9312183e940b4d60cb9397'
  Account.deleteOne({_id: account })
    .then(() => {
      res.send('oke')
    })
    .catch(next);
})

//CREATE ACCOUNT;
Router.post('/account', async (req,res,next) => {
  let user = '5e8caba7898bb0332078c273';
  let address = '0x94fe5890Ec13F72D3fEeF42B34c0ccc2B0F01e29';
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
      }
  
  Account.create({ETH: address, key, role: 'admin'})
    .then(function (account) {
      res.json(account)
      return User.updateOne({_id: user}, {account: account.id})
    })
    .then(function () {
      res.send('oke')
    })
    .catch(next)

});

const { sendAdminCodeo, sendCodeo, referralStorage } = require('../controllers/transfer/codeTransferController');
const refCheck = require('../middlewares/referralCheck');

//TRANSFER
Router.post('/transfer', (req,res,next) => {
  let payload = {id: '5e8ca516898bb0332078c270'}
  console.log(req.body, 'This is req.body');
  req.decoded = payload;
  next();
}, sendCodeo, sendAdminCodeo, referralStorage,)


// Router.patch('/admin/:account', function (req,res,next) {
//   let account = req.params.account;
//   Account.updateOne({user: account}, {role: 'admin'})
//     .then(function() {
//       res.send('Oke');
//     })
//     .catch(next);
// })

// Router.patch('/ver', function (req,res,next) {
//     // let user = '5e8ca4e2898bb0332078c26f'
//     // User.updateOne({_id: user}, {verification: true})
//     //     .then(function() {
//     //         res.send('Oke')
//     //     })
//     //     .catch(next)
//     User.updateMany({verification: false}, {verification: true})
//       .then(function () {
//         res.send('oke')
//       })
//       .catch(next)
// })

// Router.post('/', function (req,res,next) {
//     let user = '5e8cab2a898bb0332078c271'
//     let ETH = '0xcC8449921ECf1638DC6EDA34ca00910fF9E1Df8a'
//     let key =  {
//       version: 3,
//       id: 'd4e0e674-bda4-4f2c-8957-10c329e3f1dc',
//       address: 'cc8449921ecf1638dc6eda34ca00910ff9e1df8a',
//       crypto: {
//         ciphertext: 'ce32b2917a4f2b98d166d4c8c2bc08f9ce559c955ea5e8a1646913800ac103b1',
//         cipherparams: { iv: 'ca27622a2b5830c02844224b39297c17' },
//         cipher: 'aes-128-ctr',
//         kdf: 'scrypt',
//         kdfparams: {
//           dklen: 32,
//           salt: '6219c575131e9605037b1b4f7a238eddc2a647001ee0a249107287b5ea3cf55e',
//           n: 8192,
//           r: 8,
//           p: 1
//         },
//         mac: 'f2f2e41ee5b6178d28a337fddc94df87469929c2e7b9fea0f7491ef33c069506'
//       }
//     };
//     let myAccount;

//    Account.create({
//             ETH,
//             key: key,
//             user
//         })
//     .then(function(account) {
//         myAccount = account;
//         return User.updateOne({_id: user}, { account: myAccount.id }) 
//     })
//     .then(function() {
//         res.status(200).json(myAccount);
//     })
//     .catch(next);

// })

// Router.patch('/', function (req,res,next) {
//   User.updateOne({_id: '5e81bbf4f00a5233100cd101'}, {ref: 'laskarks'})
//     .then(function() {
//       res.status(201).json({messag: 'Hallo success'})
//     })
//     .catch(next);
// })

// Router.get('/', function (req,res,next) {
//   User.findOne({ref: 'laskarks'})
//     .then(function (user) {
//       res.json(user)
//     })
//     .catch(next)
// });


// Router.patch('/eth', function (req,res,next) {
//   Account.updateOne({_id: '5e8cad602fb0fb2a944509a7'}, {ETH: '0x680E4CaD6105d7E773BEE7fc01B9cBA282f74Ea8'})
//     .then(function() {
//       res.send('Oke')
//     })
//     .catch(next)
// })

module.exports = Router;