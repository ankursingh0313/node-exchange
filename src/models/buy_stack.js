const mongoose = require('mongoose');

const buy_stackSchema = new mongoose.Schema({
    order_id:   { type: String },
    user_id:    { type: String },
    raw_price:  { type: Number  },
    currency_type:  { type: String },
    compare_currency:   { type: String },
    volume: { type: Number },
    order_date: { type: String },
    time_stamp: { type: String },
    total_buy:  { type: Number },
    last_reansaction:   { type: Number },
    order_status:   { type: Number },
    buy_from:   { type: String },
    trade_by:   { type: String },
 
}, { timestamps: true, collection: 'buy_stack' });

module.exports = mongoose.model('buy_stack', buy_stackSchema)