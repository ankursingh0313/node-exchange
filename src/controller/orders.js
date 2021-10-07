const { getUserBalance, updateUserBalance } = require('../utils/function.wallets');
const { createUniqueID } = require('../utils/functions');
const { executeOrder } = require('../utils/functions.orders');


exports.sellOrder = async (req, res) => {
    const SellStack = require('../models/sell_stack');
    const body = req.body;
    const balance = await getUserBalance(body.user_id, body.currency_type);
    /*if (body.volume > balance) {
        return res.json({
            status: 200,
            error: true,
            message: 'Insufficient fund in wallet!'
        })
    }*/
    const order_id      = createUniqueID('sell_order');
    const user_id       = body.user_id;
    const raw_price     = parseFloat(body.raw_price);
    const currency_type = body.currency;
    const compare_currency = body.compare_currency;
    const volume        = body.volume;
    const order_date    = Date.now();
    const execution_time= ''; 
    const total_executed    = 0;
    const last_reansaction = '';
    const order_status  = 0;
    const executed_from = '';
    const order_type = body.type == 'p2p' ? 'p2p' : 'exc';
    /*
    try {
        const sellstack = await SellStack.create({
            order_id, user_id, raw_price, currency_type, compare_currency, volume, order_date, execution_time, total_executed, last_reansaction, order_status, executed_from, order_type
        })
        const isDeducted = await updateUserBalance(user_id, currency_type, volume, 'sub', '');
        if (!isDeducted) {
            await SellStack.deleteOne({ "order_id": order_id });
            return res.json({
                status: 200,
                error: true,
                message: 'Insufficient fund in wallet!'
            })
        }
    } catch (error) {
        console.log("Error: >from: controller> orders > sellOrder > try: ", error.message);
        return res.json({
            status: 400,
            error: true,
            message: "Order couldn't create"
        })
    }*/

    const order = {
        order_id,
        user_id,
        currency_type,
        compare_currency,
        execution_time: Date.now(),
        total_executed,
        last_reansaction,
        executed_from,
        order_type,
        order_direction: 'sell',
        volume,
        raw_price,
        order_status
    }
    try {
        await executeOrder(order);
    } catch (error) {
        console.log("Error: >from: controller> orders > sellOrder > try2 (order execution): ", error.message);
        return res.json({
            status: 400,
            error: true,
            message: "Order created but execution error found!"
        })
    }
    
    return res.json({
        status: 200,
        error: false,
        message: 'Order Created Successfully!',
        order_id
    })
};


exports.buyOrder = async (req, res) => {
    const BuyStack = require('../models/buy_stack');
    const body = req.body;
    const balance = await getUserBalance(body.user_id, body.compare_currency); // here we will check for compare currency balance
    if (parseFloat(body.volume) * parseFloat(body.raw_price) > balance ) {
        return res.json({
            status: 200,
            error: true,
            message: 'Insufficient fund in wallet!'
        })
    }
    const order_id = createUniqueID('buy_order');
    const user_id = body.user_id;
    const raw_price = parseFloat(body.raw_price);
    const currency_type = body.currency;
    const compare_currency = body.compare_currency;
    const volume = parseFloat(body.volume);
    const order_date = Date.now();
    const execution_time = '';
    const total_executed = 0;
    const last_reansaction = '';
    const order_status = 0;
    const executed_from = '';
    const order_type = body.type == 'p2p' ? 'p2p' : 'exc';
    /*
    try {
        const buystack = await BuyStack.create({
            order_id, user_id, raw_price, currency_type, compare_currency, volume, order_date, execution_time, total_executed, last_reansaction, order_status, executed_from, order_type
        })
        const isDeducted = await updateUserBalance(user_id, compare_currency, (volume)*(raw_price), 'sub');
        if (!isDeducted) {
            await BuyStack.deleteOne({ "order_id": order_id });
            return res.json({
                status: 200,
                error: true,
                message: 'Insufficient fund in wallet!'
            })
        }
    } catch (error) {
        console.log("Error: >from: controller> orders > buyOrder > try: ", error.message);
        return res.json({
            status: 400,
            error: true,
            message: "Order couldn't create"
        })
    }*/
    const order = {
        order_id,
        user_id,
        currency_type,
        compare_currency,
        execution_time: Date.now(),
        total_executed,
        last_reansaction,
        executed_from,
        order_type,
        order_direction: 'buy',
        volume,
        raw_price,
        order_status
    }
    try {
        const historyId = await executeOrder(order, false);
        if (historyId) {
            return res.json({
                status: 200,
                error: false,
                message: 'Order Created and Executed Successfully!',
                order_id
            })
        } else {
            return res.json({
                status: 200,
                error: false,
                message: "Order Created Successfully, but didn't Executed (in queue)!",
                order_id
            })
        }
    } catch (error) {
        console.log("Error: >from: controller> orders > buyOrder > try2 (order execution): ", error.message);
        return res.json({
            status: 400,
            error: true,
            message: "Order Created Successfully, but didn't Executed (in queue)*"
        })
    }
    return res.json({
        status: 200,
        error: false,
        message: 'Order Created Successfully!',
        order_id
    })
}


