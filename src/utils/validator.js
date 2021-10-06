
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


module.exports = {
    validateUserId,
    validateCurrency,
    validateAmount,
    validatePrice
}