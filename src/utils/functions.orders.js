const { validateOrderId } = require("./validator");

async function executeOrder(order, deepCheck = true) {
    console.log("Order to execute: ", order);
    if (await verifieOrder(order, deepCheck)) { return false; }
    console.log("abcd1")
    if (order.order_status != 0) { return false; }
    console.log("abcd2")
    let history_id = false;
    if (order.order_direction == 'sell') {
        console.log("abcd")
        const BuyStack = require('../models/buy_stack');
        try {
            const buy_orders = await BuyStack.find({ currency_type: { $regex: new RegExp(order.currency_type, "i") }, compare_currency: { $regex: new RegExp(order.compare_currency, "i") }, order_status: 0, raw_price: order.raw_price });
            if (buy_orders.length <= 0) { return false; }
            buy_orders.map(async (order_node) => {
                if (order_node.volume == order.volume) {
                    // update both 
                    const history = {
                        currency_type: order.currency_type,
                        compare_currency: order.currency_type,
                        price: order.raw_price,
                        volume: order.volume,
                        sell_user_id: order.user_id,
                        buy_user_id: order_node.user_id,
                        sell_order_id: order.order_id,
                        buy_order_id: order_node.order_id,
                        trade_type: order.order_type
                    };
                    history_id = await createOrderHistory(history);
                } else if (order_node.volume > order.volume) {
                    // update self
                    const history = {
                        currency_type: order.currency_type,
                        compare_currency: order.compare_currency,
                        price: order.raw_price,
                        volume: order.volume,
                        sell_user_id: order.user_id,
                        buy_user_id: order_node.user_id,
                        sell_order_id: order.order_id,
                        buy_order_id: order_node.order_id,
                        trade_type: order.order_type
                    };
                    history_id = await createOrderHistory(history);
                } else if (order_node.volume < order.volume) {
                    // update him
                    const history = {
                        currency_type: order.currency_type,
                        compare_currency: order.compare_currency,
                        price: order.raw_price,
                        volume: order_node.volume,
                        sell_user_id: order.user_id,
                        buy_user_id: order_node.user_id,
                        sell_order_id: order.order_id,
                        buy_order_id: order_node.order_id,
                        trade_type: order.order_type
                    };
                    history_id = await createOrderHistory(history)
                }
            })
        } catch (error) {
            console.log("Error: >from: utils> functions.orders > executeorder > try-sell (fetching buy stack): ", error.message);
            return false;
        }
    } else if (order.order_direction == 'buy') {
        const SellStack = require('../models/sell_stack');
    } else { return false; }
    return true;
}
async function verifieOrder(order, deepCheck = true) {
    // const SellStack = require('../models/sell_stack');
    try {
        const { order_id,
            user_id,
            currency_type,
            compare_currency,
            execution_time,
            total_executed,
            last_reansaction,
            executed_from,
            order_type,
            order_directon,
            volume,
            raw_price,
            order_status } = order;
        if (!await validateOrderId(order_id, order_type, deepCheck)) {
            return false;
        }
        if (deepCheck) {
            const { validateCurrency, validateAmount, validatePrice, validateUserId } = require('../utils/validator');
            if (!validateUserId(user_id)) { return false; }
            if (!validateAmount(volume)) { return false; }
            if (!validatePrice(raw_price)) { return false; }
            if (!validateCurrency(currency_type)) { return false; }
            if (!validateCurrency(compare_currency)) { return false; }
            if (order_directon != 'sell' && order_directon != 'buy') { return false; }
            return true;
        }
        if (total_executed >= amount) { return false; }
    } catch (error) {
        console.log("Error: >from: utils> functions.orders > verifieOrder > try-parent (export variable and more): ", error.message);
        return false;
    }
    return true;
}
async function createOrderHistory(history) {
    const TradeHistory = require('../models/trade_history');
    const { createUniqueID } = require("./functions");
    const history_id = createUniqueID('history');
    try {
        const trade_date = Date.now();
        const { currency_type, compare_currency, price, volume, sell_user_id, buy_user_id, sell_order_id, buy_order_id, trade_type } = history;
        const history_token = await TradeHistory.insertOne({
            history_id, currency_type, compare_currency, price, volume, sell_user_id, buy_user_id, sell_order_id, buy_order_id, trade_type, trade_date
        });
    } catch (error) {
        console.log("Error: >from: utils> functions.orders > updateOrderHistory > try-extract and insert (fetching buy stack): ", error.message);
        return false;
    }
    return history_id;
}
async function updateWallet() {
    
}
module.exports = {
    executeOrder
}