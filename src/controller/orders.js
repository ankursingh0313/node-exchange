const { getUserBalance, updateUserBalance } = require('../utils/function.wallets');
const { createUniqueID } = require('../utils/functions');


exports.sellOrder = async (req, res) => {
    const SellStack = require('../models/sell_stack');
    const body = req.body;
    const balance = await getUserBalance(body.user_id, body.currency_type);
    if (body.volume > balance) {
        return res.json({
            status: 200,
            error: true,
            message: 'Insufficient fund in wallet!'
        })
    }
    const order_id       = createUniqueID('sell_order');
    const user_id       = body.user_id;
    const raw_price     = parseFloat(body.raw_price);
    const currency_type = body.currency;
    const compare_currency = body.compare_currency;
    const volume        = body.volume;
    const order_date    = Date.now();
    const execution_time= ''; 
    const total_sell    = 0;
    const last_reansaction = '';
    const order_status  = 0;
    const sell_from = '';
    const order_type = body.type == 'p2p' ? 'p2p' : 'exc';
    
    try {
        const sellstack = await SellStack.create({
            order_id, user_id, raw_price, currency_type, compare_currency, volume, order_date, execution_time, total_sell, last_reansaction, order_status, sell_from, order_type
        })
        const isDeducted = await updateUserBalance(user_id, currency_type, volume, 'sub');
        if (!isDeducted) {
            await SellStack.deleteOne({ "order_id": order_id });
            return res.json({
                status: 200,
                error: true,
                message: 'Insufficient fund in wallet!'
            })
        }
    } catch (error) {
        console.log("Error: >from: controller> orders > sellOrder > try", error.message);
        return res.json({
            status: 400,
            error: true,
            message: "Order couldn't create"
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
    const total_sell = 0;
    const last_reansaction = '';
    const order_status = 0;
    const sell_from = '';
    const order_type = body.type == 'p2p' ? 'p2p' : 'exc';

    try {
        const buystack = await BuyStack.create({
            order_id, user_id, raw_price, currency_type, compare_currency, volume, order_date, execution_time, total_sell, last_reansaction, order_status, sell_from, order_type
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
        console.log("Error: >from: controller> orders > buyOrder > try", error.message);
        return res.json({
            status: 400,
            error: true,
            message: "Order couldn't create"
        })
    }
    return res.json({
        status: 200,
        error: false,
        message: 'Order Created Successfully!',
        order_id
    })
}


