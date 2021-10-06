const mongoose = require("mongoose");

const referral_commissionSchema = new mongoose.Schema(
  {
    order_id: { type: String },
    userId: { type: String },
    _from: { type: String },
    commission: { type: String },
  },
  { timestamps: true, collection: "referral_commission" }
);

module.exports = mongoose.model("referral_commission", referral_commissionSchema);
