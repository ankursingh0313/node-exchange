
const Currency = require('../models/suppoted_currency')


exports.suppoted_currency= async(req, res) => {
    const body = req.query;
    let symbols = body?body.symbols?body.symbols.split(','):[]:[];
    // console.log("symbols", symbols);
    try {
        // let currencyList = [];
        // let currencysymbol = symbols.map((v) => (v, v))
        //    console.log(currencysymbol)
        // currencyList = await Currency.find({'symbols': symbols}, 'symbols');
        if (symbols.length > 0) {
            currencyList = await Currency.find({ symbol: { $all: new RegExp(symbols.toString().replace(/,/g, '|'), 'gi')}});
        } else {
            currencyList = await Currency.find()
        }
        res.status(200).json({ currencyList });
      } catch (error) {
        retres.status(400).json({ message: `${error}` });
      }
}



// ;$or: [
//     {symbol: {symbols.map((v) => (v, v))}},
//     {symbol: { $regex: new RegExp('btc', "i")}},
//     {symbol: { $regex: new RegExp('trx', "i")}}
//   ]