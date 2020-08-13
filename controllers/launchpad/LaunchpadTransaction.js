const LaunchpadProduct = require('../../models/launchpad/product')

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
    const data = await LaunchpadProduct.findOne({ _id: id })
    if (data) res.status(200).json(data)
    else res.status(404).json({ message: 'Not Found.' })
  } 

}

module.exports = LaunchpadTransaction
