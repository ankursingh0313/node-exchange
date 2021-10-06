const mongoose = require('mongoose');

const walletsSchema = new mongoose.Schema({
    private_key: { type: String },
    public_key: { type: String },
    wallet_address: { type: String },
    wallet_hex: { type: String },
    wallet_type: { type: String },
    user: { type: String },
    balance: { type: Number },
    v_balanace: { type: Number },
    locked: { type: Number },
    date: { type: Date.now() },
    type: { type: String },
    wallet_status: { type: Number },
}, { timestamps: true, collection: 'wallets' });

module.exports = mongoose.model('wallets', walletsSchema)