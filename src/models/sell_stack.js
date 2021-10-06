const mongoose = require("mongoose");

const sell_stackSchema = new mongoose.Schema(
  {
    order_id: { tupe: String },
    user_id: { tupe: String },
    raw_price: { tupe: Number },
    currency_type: { tupe: String },
    compare_currency: { tupe: String },
    volume: { tupe: String },
    order_date: { tupe: String },
    time_stamp: { tupe: String },
    total_sell: { tupe: String },
    last_reansaction: { tupe: String },
    order_status: { tupe: Number },
    sell_from: { tupe: String },
    trade_by: { tupe: String },
  },
  { timestamps: true, collection: "sell_stack" }
);

module.exports = mongoose.model("sell_stack", sell_stackSchema);
