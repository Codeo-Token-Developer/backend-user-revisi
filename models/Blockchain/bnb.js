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
    symbol: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("bnbd", Schema);
