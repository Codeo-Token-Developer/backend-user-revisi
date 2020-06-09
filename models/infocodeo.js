const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
    {
        CirculatingSupply: {
            type: Number,
        },
        symbol: {
            type: String,
        },
    },
    { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("CirculatingSupplyCodeo", Schema);
