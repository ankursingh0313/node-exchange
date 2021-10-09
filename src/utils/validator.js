
function validateUserId(user_id) {
    // we will check that user is exists or not
    const user_id_array = user_id.split('/');
    if (user_id_array[user_id_array.length - 1] !== 'u') {
        return false;
    }
    // check user is in database or not
    if (user_id) {
        console.log('true1')
        return true;
    } else {
        return false;
    }
}
async function validateOrderId(order_id, type='exc', dbCheck=false) {
    let order_id_array = order_id.split('/');
    let order_direction = '';
    if (order_id_array.length == 2) {
        order_direction = order_id_array[order_id_array.length - 1];
        if (order_direction !== 's' && order_direction !== 'b') { return false; }
    } else { return false; }
    if (dbCheck) {
        if (order_direction == '') { return false; }
        if (order_direction == 's') {
            const SellStack = require('../models/sell_stack');
            try {
                const order_data = await SellStack.findOne({ "order_id": order_id });
                if (order_data && order_data.amount) { } else { return false };
            } catch (error) {
                return false;
            }
        } else if (order_direction == 'b') {
            const BuyStack = require('../models/buy_stack');
            try {
                const order_data = await BuyStack.findOne({ "order_id": order_id });
                if (order_data && order_data.amount) { } else { return false };
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }
    order_id_array = order_id_array[0].split('$');
    if (type == 'exc') {
        if (order_id_array.length == 2 &&
            order_id_array[0] == 'order'
        ) { } else {
            return false;
        }
    } else if (type == 'p2p') {
        if (order_id_array.length == 3 &&
            order_id_array[0] == 'order' &&
            order_id_array[1] == 'p2p'
        ) { } else {
            return false;
        }
    } else {
        return false;
    }
    if (order_id) {
        console.log('true_order_id')
        return true;
    } else {
        return false;
    }
    return true;
}
function validateCurrency(currency) {
    // validate that currency exists or not
    // check that currency is supported by us or not
    if (currency) {
        console.log('true2')
        return true;
    } else {
        return false;
    }
}

function validateAmount(amount) {
    // validate amount
    // amount can't be smaller or equal to zero '0'
    if (amount <= 0) {
        return false;
    }
    // amount always should be a number
    if (isNaN(amount)) {
        return false;
    }
    if (amount) {
        return true;
    }
    // other wise return false
    return false;
}

function validatePrice(price) {
    // price validation
    // price can't be smaller or equal to zero '0'
    if (price <= 0) {
        return false;
    }
    // price always should be a number
    if (isNaN(amount)) {
        return false;
    }
    if (price) {
        return true;
    } 
    //  other wise return false
    return false;
}

function validateUniqueAccessToken(token) {
    try {
        const { token_salt_arr, token_letter_arr, categories } = require('./globals');
        const token_arr = token.split('-');
        if (token_arr.length != 5) {
            return false;
        }
        const d1 = parseInt(token_arr[0], 36);
        const d2 = parseInt(token_arr[4], 32);
        if (d1 != d2) {
            return false;
        }
        if (!token_salt_arr.includes(token_arr[2])) {
            return false;
        }
        if (!token_letter_arr.includes(token_arr[3])) {
            return false;
        }
        if (!categories.includes(token_arr[1])) {
            return false;
        }
    } catch (error) {
        console.log("Err from: utils > validator > validateUniqueAccessToken > try: ", error.message)
        return false;
    }
    return true;
}

function verifyOTP(otp, email_otp) {
    const valid_duration = 5*60*1000;
    const email_otp_arr = email_otp.split('_');
    const _otp = parseInt(email_otp_arr[0]);
    const timestamp = parseInt(email_otp_arr[1]);
    const current_date = Date.now();
    if (current_date <= (timestamp+valid_duration) && otp == _otp) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    validateUserId,
    validateCurrency,
    validateAmount,
    validatePrice,
    validateOrderId,
    validateUniqueAccessToken,
    verifyOTP
}