const mongoose = require("mongoose");

const wallet_coldSchema = new mongoose.Schema(
  {
    wallet_type: { type: String },
    wallet_address: { type: String },
    private_key: { type: String },
    qr_code: { type: String },
    total_funds: { type: String },
  },
  { timestamps: true, collection: "wallet_cold" }
);

module.exports = mongoose.model("wallet_cold", wallet_coldSchema);
