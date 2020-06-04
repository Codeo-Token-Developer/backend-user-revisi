const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
    {
        CirculatingSupplyDecimal: {
            type: Number,
        },
        symbol: {
            type: String,
        },
    },
    { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("CirculatingSupplyCodeonotbc", Schema);
