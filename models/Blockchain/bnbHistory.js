const mongoose = require('mongoose');

const accHistorySchema = new mongoose.Schema({

  transaction_id: {
    type: String,
  },
  transaction_status: {
    type: Boolean
  },
  value: {
    type: Number
  },
  to: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  ket: {
    type: String
  },
}, { timestamps: { createdAt: 'created_at' } });

const accHistory = mongoose.model('bnbHistory', accHistorySchema);

module.exports = accHistory;