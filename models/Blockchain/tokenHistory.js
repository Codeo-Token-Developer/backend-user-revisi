const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transaction_id: {
      type: String,
    },
    transaction_status: {
      type: Boolean,
    },
    from: {
      type: String,
    },
    value: {
      type: Number
    },
    to: {
      type: String
    },
    link: {
      type: String
    },
    ket: {
      type: String
    },
    description: {
      type: String
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("tokenhistory", Schema);
