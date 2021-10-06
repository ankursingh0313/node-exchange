const Wallets = require("../models/wallets");
async function getUserBalance(user_id, currency) {
    // check user balance and return
    try {
        const userWallet = await Wallets.findOne({ "user": user_id, "wallet_type": { $regex: new RegExp(currency, "i") } });
        const balance = userWallet ? userWallet.balance : 0;
        return balance;
    } catch (error) {
        console.log("Error: >from: function.wallet.js > getUserBalance > try: ", error.message);
        return 0;
    }
}
async function updateUserBalance(user_id, currency, amount, update_type) {
    if (update_type == 'add' || update_type == 'sub') {
        const current_balance = await getUserBalance(user_id, currency);
        try {
            if (update_type == 'sub' && parseFloat(current_balance) < parseFloat(amount)) {
                return false;
            }
            const wallet = await Wallets.updateOne({ user: user_id, wallet_type: currency }, {
                $set: {
                    balance: update_type == 'add' ? parseFloat(current_balance) + parseFloat(amount) : parseFloat(current_balance) - parseFloat(amount)
                }
            });
            return true;
        } catch (error) {
            console.log("Error: >from: function.wallet.js > updateUserBalance > try: ", error.message);
            return false;
        }
    } else {
        return false;
    }
}
module.exports = {
    getUserBalance,
    updateUserBalance
}