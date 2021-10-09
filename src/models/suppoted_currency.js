const mongoose = require("mongoose");

const suppoted_currencySchema = new mongoose.Schema(
  {
    coin_id: { type: Number },
    symbol: { type: String, required:true, unique: true, trim: true },
    name: { type: String, required:true, unique: true, trim: true },
    icon: { type: String, required:true, trim: true },                  
    dw: { type: Number },
    pairing_currency: { type: Number },
    is_paired_inr: { type: Boolean, default: false },
    is_paired_usdt: { type: Boolean, default: false },
    is_paired_btc: { type: Boolean, default: false },
    is_paired_vrx: { type: Boolean, default: false },
    inr_price: { type: Boolean, default: false },
    usdt_price: { type: Boolean, default: false },
    btc_price: { type: Boolean, default: false },
    vrx_price: { type: Boolean, default: false },
    is_paired: { type: Boolean, default: false },
    is_buy: { type: Boolean, default: false },
    is_sell: { type: Boolean, default: false },
    coin_status: { type: Boolean, default: false },
    contract_address: { type: String, unique: true, trim: true },
    contract_type: { type: String, required: true, trim: true },
    trade_fee: { type: Number, default: 0},
    withdrawal_fee: { type: Number, default: 0 },
    withdrawal_limit: { type: Number, default: 0 },
    deposit_fee: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "suppoted_currency" }
);

module.exports = mongoose.model("suppoted_currency", suppoted_currencySchema);
