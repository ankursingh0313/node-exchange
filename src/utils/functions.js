const env = require('dotenv');
env.config();
function createUniqueID(type = 'user') {
    const unique_string = Date.now().toString(16);
    let id = '';
    switch (type) {
        case 'user':
            id = unique_string + '/u';
            break;
        case 'sell_order':
            id = 'order$' + unique_string + '/s';
            break;
        case 'buy_order':
            id = 'order$' + unique_string + '/b';
            break;
        case 'p2p_sell_order':
            id = 'order$p2p$' + unique_string + '/s';
            break;
        case 'p2p_buy_order':
            id = 'order$p2p$' + unique_string + '/b';
            break;
        case 'history':
            id = 'history$' + unique_string;
            break;
        default:
            id = unique_string + '/u';
            break;
    }
    return id;
}
function createUniqueAccessToken(category) {
    const { token_salt_arr, token_letter_arr } = require('./globals');
    /**
     * category**
     * a: forever
     * b: 1 year
     * c: 6 months
     * d: 3 months
     * e: 1 month
     * f: 1 week
     * g: 2 year
     * h: 3 year
     * i: 5 year
     * z: forever with update permission
     */
    const arr_len = token_salt_arr.length;
    const l_arr_len = token_letter_arr.length;
    const salt_word = token_salt_arr[Math.round(Math.random() * ((arr_len - 1) - 0 + 1) + 0)].toLowerCase();
    const random_letter = token_letter_arr[Math.round(Math.random() * ((l_arr_len - 1) - 0 + 1) + 0)];
    const current_date = Date.now();
    // const hexaDate = current_date.toString(16);
    // parseInt(hexString, 16);
    const b32date = current_date.toString(32);
    const b36date = current_date.toString(36);
    const token = b36date + '-' + category + '-' + salt_word + '-' + random_letter + '-' + b32date;
    return token;
}
function calculatePercentage(number, percent) {
    return parseFloat(number) * (parseFloat(percent) / 100.00);
}
function calculateTakerFee(amount) {
    const TAKER_FEE = process.env.TAKER_FEE;
    return calculatePercentage(amount, TAKER_FEE);
}
function calculateMakerFee(amount) {
    const MAKER_FEE = process.env.MAKER_FEE;
    return calculatePercentage(amount, MAKER_FEE);
}
function generateOTP() {
    const otp = Math.floor((Math.random()*1000000) + 1);
    return otp;
}
module.exports = {
    createUniqueID,
    calculatePercentage,
    calculateMakerFee,
    calculateTakerFee,
    createUniqueAccessToken,
    generateOTP
}