const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Required.']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  full_name: {
    type: String,
    required: [true, 'Full name Required.']
  },
  current_supply: {
    type: Number,
    default: 0
  },
  session_supply: {
    type: Number,
    required: [true, 'Supply needed.']
  },
  coin_symbol: {
    type: String
  },
  ieo_ratio: {
    type: Number,
    required: [true, 'Ratio needed.']
  },
  ieo_minimum: {
    type: Number,
    default: 0
  },
  bonus: {
    type: Number,
    default: 0
  },
  referral_reward: {
    type: Number,
    default: 0
  },
  technology_foundation: {
    type: String,
    required: [true, 'Foundation needed.']
  },
  website: {
    type: String,
    default: '--'
  },
  whitepaper: {
    type: String,
    default: '--'
  },
  telegram: {
    type: String,
    default: '--'
  },
  kakao: {
    type: String,
    default: '--'
  },
  twitter: {
    type: String,
    default: '--'
  },
  instagram: {
    type: String,
    default: '--'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Boolean,
    default: true
  },
  ,
  quote_desc: {
        type: String
  },
  project_introduction: {
        type: String
  },
  start_date: {
    type: Date,
    required: [true, 'Start date needed.']
  },
  end_date: {
    type: Date,
    required: [true, 'End date needed.']
  },
  status: {
    type: Boolean,
    default: true
  }
})

const product = mongoose.model('LaunchpadAdmin', productSchema)

module.exports = product
