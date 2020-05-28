const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    History: {
      type: Array,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("ltcH", Schema);
