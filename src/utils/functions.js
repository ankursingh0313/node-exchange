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
module.exports = {
    createUniqueID
}