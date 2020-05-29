const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
    },
    txs_count: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("ethd", Schema);
