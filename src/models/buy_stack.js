const mongoose = require("mongoose");

const buy_stackSchema = new mongoose.Schema({
    order_id: { type: String },
    user_id: { type: String },
    raw_price: { type: Number },
    currency_type: { type: String },
    compare_currency: { type: String },
    volume: { type: String },
    order_date: { type: String },
    execution_time: { type: String },
    total_sell: { type: String },
    last_reansaction: { type: String },
    order_status: { type: Number },
    buy_from:   { type: String },
    order_type: { type: String, default: 'exc' },
 
}, { timestamps: true, collection: 'buy_stack' });

module.exports = mongoose.model("buy_stack", buy_stackSchema);
