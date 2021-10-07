const TradeHistory = require('../models/trade_history')
// const {parse, stringify} = require('flatted');



exports.trade_history = async(req, res) => {
    const body = req.body;
    let parmas = {};
    if (body.history_id) {  parmas.history_id = body.history_id; }
    if (body.currency) { parmas.currency_type = body.currency; }
    if (body.compare_currency) { parmas.compare_currency = body.compare_currency; }
    if (body.price) { parmas.price = body.price; }
    if (body.trade_date) { parmas.trade_date = body.trade_date; }
    if (body.sell_user_id) { parmas.sell_user_id = body.sell_user_id; }
    if (body.buy_user_id) { parmas.buy_user_id = body.buy_user_id; }
    if (body.buy_order_id) { parmas.buy_order_id = body.buy_order_id; }
    if (body.sell_order_id) { parmas.sell_order_id = body.sell_order_id;}
    if (body.trade_type) { parmas.trade_type = body.trade_type; }
    try{

        // if (parmas.length > 0) {
            history = await TradeHistory.find(parmas);
            return res.json({
                status: 200,
                history
            })
        // }
           
        
        
        //         const body = req.query;
        // const { 
        //     history_id,
        //     currency_type,
        //     compare_currency,
        //     price,
        //     volume,
        //     trade_date,
        //     sell_user_id,
        //     buy_user_id,
        //     buy_order_id,
        //     sell_order_id,
        //     trade_type} = req.body;

            
        //     if(currency_type){
        //         const history = await TradeHistory.findOne({currency_type: currency_type})
        //         // console.log(history)
        //         res.status(200).json({ history: history });
        //     } 
        //     else if(history_id) {
        //         const history = await TradeHistory.findOne({history_id: history_id})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(compare_currency) {
        //         const history = await TradeHistory.findOne({compare_currency: compare_currency})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(price) {
        //         const history = await TradeHistory.findOne({price: price})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(volume) {
        //         const history = await TradeHistory.findOne({volume: volume})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(trade_date) {
        //         const history = await TradeHistory.findOne({trade_date: trade_date})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(sell_user_id) {
        //         const history = await TradeHistory.findOne({sell_user_id: sell_user_id})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(buy_user_id) {
        //         const history = await TradeHistory.findOne({buy_user_id: buy_user_id})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(buy_order_id) {
        //         const history = await TradeHistory.findOne({buy_order_id: buy_order_id})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(sell_order_id) {
        //         const history = await TradeHistory.findOne({sell_order_id: sell_order_id})
        //         res.status(200).json({ history: history });
        //     }
        //     else if(trade_type) {
        //         const history = await TradeHistory.findOne({trade_type: trade_type})
        //         res.status(200).json({ history: history });
        //     }
}
    catch{
        console.log("Error: >from: controller> trade > trade_history > try: ", error.message);
        res.status(400).json({ message: `${error}` });
    }

    // if(compare_currency){
    //     const history = TradeHistory.find()
    //     res.status(200).json({ history: stringify(history) });
    // }
    // if(volume){
    //     const history = TradeHistory.find()
    //     res.status(200).json({ history: stringify(history) });
    // }
    // if(price){
    //     const history = TradeHistory.find()
    //     res.status(200).json({ history: stringify(history) });
    // }
    // if(trade_date){
    //     const history = TradeHistory.find()
    //     res.status(200).json({ history: stringify(history) });
    // }

};


