const { validateUserId, validateCurrency, validateAmount, validatePrice, checkUserBalance } = require("./validator");

function orderValidator(req, res, next) {
    // code for checking currenct user have perticular balance or not
    const data = req.body ? req.body : {};
    const user_id = data.user_id ? data.user_id : undefined;
    const currency = data.currency ? data.currency : undefined;
    const compare_currency = data.compare_currency ? data.compare_currency : undefined;
    const amount = data.amount ? data.amount : undefined;
    const price = data.price ? data.price : undefined;
   
    if (validateUserId(user_id) &&
        validateCurrency(currency) &&
        validateCurrency(compare_currency) &&
        validateAmount(amount) &&
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