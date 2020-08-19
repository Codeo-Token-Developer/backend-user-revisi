const LaunchpadProduct = require('../../models/launchpad/SupplyProject')
const User = require('../../models/AuthSide/user.model')
const Account = require('../../models/AccountSide/account.model')
const getCurrency = require('../../helpers/codeo_currency')
const UserSupply = require('../../models/launchpad/UserSupply')
const getCodeoBalance = require('../../helpers/getBalance/getBalance')
class LaunchpadTransaction {
  
  static findAll (req, res, next) {
    console.log('masuk find all project')
    LaunchpadProduct.find({})
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(next)
  }

  static findOne (req, res, next) {
    LaunchpadProduct.findOne({ _id: req.params.id })
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(next)
  }

  static async buySupply(req, res, next) {
    try {
      const value = +req.body.value
      console.log('buy supply')
      const acc = await Account.findOne({ user: req.decoded.id })
      getCodeoBalance(acc.ETH).then( async balance => {
        console.log(balance)
        if (balance >= value) {
          const purchase = await LaunchpadProduct.findOneAndUpdate({ _id: req.params.id }, { $inc: { current_supply: value } }, { omitUndefined: true, new: true })
          const total = value * purchase.ieo_ratio
          console.log(total, '<<<<<totalllllll')
          await Account.updateOne({ user: req.decoded.id }, { $inc: { CODEO_coin: -total } }, { omitUndefined: true })
          return res.status(201).json({ message: 'Purchased.' })
        } else {
          res.status(400).json({ message: 'Insufficient Balance.' })
        }
      })
      .catch(err => next(err))
    } catch (err) {
      next(err)
    }
  } 

}

module.exports = LaunchpadTransaction
