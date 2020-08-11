const LaunchpadProduct = require('../../models/launchpad/product')
const User = require('../../models/AuthSide/user.model')
const Account = require('../../models/AccountSide/account.model')
const getCurrency = require('../../helpers/codeo_currency')
const UserSupply = require('../../models/launchpad/UserSupply')

class LaunchpadTransaction {
  
  static findAll (req, res, next) {
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
    const project = await LaunchpadProduct.findOne({ _id: req.params.id })
    const account = await Account.findOne({ user: req.decoded.id }) 
    const value = req.body.value
    const codeo = await getCurrency()
    if (project) {
      if (account.CODEO_coin >= value * codeo.usd) {
        const newsupply = await UserSupply.create({ user: req.decoded.id, project: project.id, supply: value })
        const added = await LaunchpadProduct.updateOne({ _id: req.params.id }, { current_supply: project.current_supply + newsupply.supply })
        if (added) {
          Account.updateOne({ user: req.decoded.id }, { CODEO_coin: account.CODEO_coin - (value * codeo.usd) })
          .then(() => {
            res.status(201).json({ message: 'Supply Purchased.' })
          })
          .catch(next)
        } else {
          res.status(500).json({ message: 'An Error Occured.' })
        }
      } else {
        res.status(400).json({ message: 'Insufficient Balance.' })
      }
    }
    else res.status(404).json({ message: 'Not Found.' })
  } 

}

module.exports = LaunchpadTransaction
