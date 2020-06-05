const mongoose = require("mongoose");

var Schema = new mongoose.Schema(
    {
        totalSupply: {
            type: Number,
        },
        symbol: {
            type: String,
        },
    }
);

module.exports = mongoose.model("totalSupply", Schema);
