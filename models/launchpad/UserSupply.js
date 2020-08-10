const mongoose = require('mongoose')

const supplyschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LaunchpadAdmin'
  },
  supply: {
    type: Number,
    required: [true, 'Supply needed.']
  }

}, { versionKey: false, timestamps: { createdAt: 'createdAt' } })

const UserSupply = mongoose.model('UserSupply', supplyschema)

module.exports = UserSupply