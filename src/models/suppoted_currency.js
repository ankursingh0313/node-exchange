const mongoose = require('mongoose');

const suppoted_currencySchema = new mongoose.Schema({
coin_id : { type: Number},
symbol : { type: String},
name: { type:  String}, 
icon:{ type: String},
dw:{ type: Number},
pairing_currency: { type: Number},
is_paired_inr: { type: Number},
is_paired_usdt: { type: Number},
is_paired_btc: { type: Number},
is_paired_vrx: { type: Number},
inr_price: { type: Number},
usdt_price: { type: Number},
btc_price: { type: Number},
vrx_price: { type: Number},
is_paired: { type: Number},
is_buy: { type: Number},
is_sell: { type: Number},
coin_status: { type: Number},
contract_address: { type: String},
contract_type: { type: String},
trade_fee: { type: Number},
withdrawal_fee: { type: Number},
withdrawal_limit: { type: Number},
deposit_fee : { type: Number}
}, { timestamps: true, collection: 'suppoted_currency' });

module.exports = mongoose.model('suppoted_currency', suppoted_currencySchema)