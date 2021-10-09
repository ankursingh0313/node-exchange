const { createSocketClient } = require('../utils/functions.socket');
const socket = createSocketClient('kujgwvfq-z-ghosttown-z-1fhhup0p6');

function createSellOrderStack(req, res) {
    const { currency_type, compare_currency, raw_price, volume } = req.query;
    let obj = {
        currency_type,
        compare_currency,
        raw_price,
        volume
    }
    socket.emit("update_sell_stack", obj);
    return res.json({
        status: 200,
        error: false,
        message: "Sell stack created!"
    })
}

function createBuyOrderStack(req, res) {
    const { currency_type, compare_currency, raw_price, volume } = req.query;
    let obj = {
        currency_type,
        compare_currency,
        raw_price,
        volume
    }
    socket.emit("update_buy_stack", obj);
    return res.json({
        status: 200,
        error: false,
        message: "Buy stack created!"
    })
}
function createOrderHistory(req, res) {
    const { currency_type, compare_currency, raw_price, volume } = req.query;
    let obj = {
        currency_type,
        compare_currency,
        raw_price,
        volume
    }
    socket.emit("update_order_history", obj);
    return res.json({
        status: 200,
        error: false,
        message: "Order history created!"
    })
}
module.exports = {
    createSellOrderStack,
    createBuyOrderStack,
    createOrderHistory
}