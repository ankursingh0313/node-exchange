const { validateUserId, validateCurrency, validateAmount, validatePrice, checkUserBalance } = require("./validator");

function orderValidator(req, res, next) {
    // code for checking currenct user have perticular balance or not
    const body      = req.body ? req.body : {};
    const user_id   = body.user_id ? body.user_id : undefined;
    const currency  = body.currency ? body.currency : undefined;
    const compare_currency = body.compare_currency ? body.compare_currency : undefined;
    const volume    = body.volume ? body.volume : undefined;
    const price     = body.raw_price ? body.raw_price : undefined;
   
    if (validateUserId(user_id) &&
        validateCurrency(currency) &&
        validateCurrency(compare_currency) &&
        validateAmount(volume) &&
        validatePrice(price)
    ) {
        console.log('All clear!', req.url)
        next();
    } else {
        return res.json({
            status: 200,
            error: true,
            message: 'Invalid Request',
            data: req.body
        })
    }
}
module.exports = {
    orderValidator
}