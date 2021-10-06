const mongoose = require("mongoose");

const wallet_coldSchema = new mongoose.Schema(
  {
   
    wallet_type: { type: String },
    wallet_address: { type: String },
    total_funds: { type: String },
    save_by: { type: String },
  },
  { timestamps: true, collection: "wallet_cold" }
);

module.exports = mongoose.model("wallet_cold", wallet_coldSchema);
