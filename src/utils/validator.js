
function validateUserId(user_id) {
    // we will check that user is exists or not
    if (user_id) {
        return true;
    } else {
        return false;
    }
}
function validateCurrency(currency) {
    // validate that currency exists or not
    if (currency) {
        return true;
    } else {
        return false;
    }
}
function validateAmount(amount) {
    // validate amount
    if (amount) {
        return true;
    } else {
        return false;
    }
}
function validatePrice(price) {
    // price validation
    if (price) {
        return true;
    } else {
        return false;
    }
}

function checkUserBalance(currency) {
    // check user balance and return
    return 0;
}
module.exports = {
    validateUserId,
    validateCurrency,
    validateAmount,
    validatePrice,
    checkUserBalance
}