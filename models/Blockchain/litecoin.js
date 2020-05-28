const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
    },
    privateKey: {
      type: String,
    },
    publicKey: {
      type: String,
    },
    balance: {
      type: Number,
    },
    totalSpent: {
      type: String,
    },
    totalReceived: {
      type: String,
    },
    txi: {
      type: Number,
    },
    txo: {
      type: Number,
    },
    txsCount: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("ltcd", Schema);
