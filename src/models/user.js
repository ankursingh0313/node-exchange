const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    user_id: { type: Number},
    email: { type: String, required: true},
    hash_password: { type: String, required: true},
    mobile_number: { type: Number},
    created_on: { },
    created_on_time: { },
    self_ref_code: { type: String  },
    parent_ref_code: { type: String },
    user_role: { type: Number},
    email_otp: { type: Number},
    is_email_verified: { type: Number},
    is_kyc_verified: { type: Number},
    is_bank_verified: { type: Number},
    email_otp_valid: { type: String  },
    is_mobile_verified: { type: Number},
    mobile_otp: { type: String  },
    mobile_otp_valid: { type: String  },
    loginToken: { type: String  },
    tokenValid: { type: Number},
    referral_income:  { type: Number},
    ip_address: { type: String  },
    wallet_password: { type: String  },
    user_status: { type: Number}
}, { timestamps: true, collection: 'user'});



// userSchema.pre('save', function save(next) {
//     if (!this.isModified('password')) return next();
//     try {
//       const salt = bcrypt.genSalt(SALT_WORK_FACTOR);
//       this.password =  bcrypt.hash(this.password, salt);
//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   });
userSchema.virtual('password')
  .set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)
  })

userSchema.methods = {
  authenticate:  function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

// userSchema.virtual('fullName')
//   .get(function () {
//     return `${this.firstName} ${this.lastName}`
//   })

module.exports = mongoose.model('User', userSchema)