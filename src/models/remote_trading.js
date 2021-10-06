const mongoose = require("mongoose");

const remote_tradingSchema = new mongoose.Schema(
  {
    id: { type: String },
    price:  { type: Number },
    low:    { type: Number },
    high:   { type: Number },
    min_vol:    { type: Number },
    max_vol:    { type: Number },
    last_price: { type: Number },
    last_vol:   { type: Number },
    order_id:   { type: String },
    compare_currency:   { type: String },
    token:  { type: String },
    currency_type:  { type: String },
    running_status: { type: Number },
    graph:  { type: String },
    set_trade:  { type: Number },
  },
  { timestamps: true, collection: "remote_trading" }
);

module.exports = mongoose.model("remote_trading", remote_tradingSchema);
