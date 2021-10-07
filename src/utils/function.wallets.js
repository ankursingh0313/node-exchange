const Wallets = require("../models/wallets");
async function getUserBalance(user_id, currency, locked = false) {
    // check user balance and return
    try {
        const userWallet = await Wallets.findOne({ "user": user_id, "wallet_type": { $regex: new RegExp(currency, "i") } });
        if (locked) {
            const balance = {balance: userWallet ? parseFloat(userWallet.balance) - parseFloat(userWallet.locked) : 0};
            return balance;
        } else {
            const balance = {
                balance: userWallet ? parseFloat(userWallet.balance) : 0,
                locked: userWallet ? parseFloat(userWallet.locked) : 0
            }
            return balance;
        }
    } catch (error) {
        console.log("Error: >from: function.wallet.js > getUserBalance > try: ", error.message);
        return 0;
    }
}
async function updateUserBalance(user_id, currency, amount, transaction_type) {
    if (transaction_type == 'add' || transaction_type == 'sub') {
        const {balance} = await getUserBalance(user_id, currency, true);
        try {
            if (transaction_type == 'sub' && parseFloat(balance) < parseFloat(amount)) {
                return false;
            }
            const wallet = await Wallets.updateOne({ user: user_id, wallet_type: { $regex: new RegExp(currency, "i") } }, {
                $set: {
                    balance: transaction_type == 'add' ? parseFloat(balance) + parseFloat(amount) : parseFloat(balance) - parseFloat(amount)
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
async function updateUserLockBalance(user_id, currency, amount) {
    const { balance, locked } = await getUserBalance(user_id, currency, true);
    const current_balance = balance - locked;
    try {
        if (parseFloat(current_balance) < parseFloat(amount)) {
            return false;
        }
        const wallet = await Wallets.updateOne({ user: user_id, wallet_type: { $regex: new RegExp(currency, "i") } }, {
            $set: {
                locked: parseFloat(amount) + parseFloat(locked)
            }
        });
        return true;
    } catch (error) {
        console.log("Error: >from: function.wallet.js > updateUserLockedBalance > try: ", error.message);
        return false;
    }
}
async function sendBalanceToUserWallet(currency_type, compare_currency, user_id, amount, price, transaction_type) {
    if (transaction_type == 'add' || transaction_type == 'sub') {
        try {
            const currency_wallet = await Wallets.findOne({ "user": user_id, "wallet_type": { $regex: new RegExp(currency_type, "i") } });
            const compare_currency_wallet = await Wallets.findOne({ "user": user_id, "wallet_type": { $regex: new RegExp(compare_currency, "i") } });
            if (transaction_type == 'add') {
                const compare_currency_locked = parseFloat(compare_currency_wallet.locked) - (parseFloat(amount) * parseFloat(price));
                const compare_currency_balance = parseFloat(compare_currency_wallet.balance) - (parseFloat(amount) * parseFloat(price));
                const currency_balance = parseFloat(currency_wallet.balance) + parseFloat(amount);
                await Wallets.updateOne({ user: user_id, "wallet_type": { $regex: new RegExp(compare_currency, "i") } }, {
                    $set: {
                        locked: compare_currency_locked,
                        balance: compare_currency_balance
                    }
                });
                await Wallets.updateOne({ user: user_id, "wallet_type": { $regex: new RegExp(currency_type, "i") } }, {
                    $set: {
                        balance: currency_balance
                    }
                });
            }
            if (transaction_type == 'sub') {
                const currency_locked = parseFloat(currency_wallet.locked) - parseFloat(amount);
                const currency_balance = parseFloat(currency_wallet.balance) - parseFloat(amount);
                const compare_currency_balance = parseFloat(compare_currency_wallet.balance) + (parseFloat(amount) * parseFloat(price));
                await Wallets.updateOne({ user: user_id, "wallet_type": { $regex: new RegExp(currency_type, "i") } }, {
                    $set: {
                        locked: currency_locked,
                        balance: currency_balance
                    }
                });
                await Wallets.updateOne({ user: user_id, "wallet_type": { $regex: new RegExp(compare_currency, "i") } }, {
                    $set: {
                        balance: compare_currency_balance
                    }
                });
            }
        } catch (error) {
            return false;
        }
    } else { return false; }
}
module.exports = {
    getUserBalance,
    updateUserBalance,
    updateUserLockBalance,
    sendBalanceToUserWallet
}