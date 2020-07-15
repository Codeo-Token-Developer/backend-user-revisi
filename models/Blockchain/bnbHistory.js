const mongoose = require('mongoose');

const accountHistorySchema = new mongoose.Schema({

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

const accountHistory = mongoose.model('AccountHistory', accountHistorySchema);

module.exports = accountHistory;