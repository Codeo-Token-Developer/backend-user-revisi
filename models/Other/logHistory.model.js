const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var logHistorySchema = new Schema({

  ip: {
    type: String
  },
  range: [{
    type: Number
  }],
  country: {
    type: String
  },
  region: {
    type: String
  },
  eu: {
    type: String
  },
  timezone: {
    type: String
  },
  city: {
    type: String
  },
  ll: [{
    type: Number
  }],
  metro: {
    type: Number
  },
  area: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {versionKey: false, timestamps: {createdAt: 'created_at'}});

const loghistory = mongoose.model("LogHistory", logHistorySchema);
module.exports = loghistory;
