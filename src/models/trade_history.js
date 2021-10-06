const mongoose = require("mongoose");

const trade_historySchema = new mongoose.Schema(
  {
    currency_type: { type: String },
    compare_currency: { type: String },
    price: { type: Number },
    volume: { type: Number },
    trade_date: { type: String, default:Date.now() },
    inc_dec: { type: Number },
    raw_current_price_inr: { type: Number },
    raw_current_price_usdt: { type: Number },
    trade_by: { type: String },
    buy_order_id: { type: String },
    sell_order_id: { type: String },
  },
  { timestamps: true, collection: "trade_history" }
);

module.exports = mongoose.model("trade_history", trade_historySchema);
