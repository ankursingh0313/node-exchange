
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

exports.addCurrency = (req, res) => {
    try{
          Currency.findOne({ symbol: req.body.symbol })
          .exec((error, currency) => {
                if(currency) return res.status(200).json({ message: "Currency Already avilable" });
                const { symbol,
                        name,
                        icon,
                        dw,
                        is_paired_inr,
                        pairing_currency,
                        is_paired_usdt,
                        is_paired_btc,
                        is_paired_vrx,
                        inr_price,
                        usdt_price,
                        btc_price, 
                        vrx_price, 
                        is_paired,
                        is_buy, 
                        is_sell,
                        coin_status,  
                        contract_address,
                        contract_type,
                        trade_fee,
                        withdrawal_fee,
                        withdrawal_limit,
                        deposit_fee } = req.body


                        const _currency = new Currency({
                          symbol,
                          name,
                          icon,
                          dw,
                          is_paired_inr,
                          pairing_currency,
                          is_paired_usdt,
                          is_paired_btc,
                          is_paired_vrx,
                          inr_price,
                          usdt_price,
                          btc_price, 
                          vrx_price, 
                          is_paired,
                          is_buy, 
                          is_sell,
                          coin_status,  
                          contract_address,
                          contract_type,
                          trade_fee,
                          withdrawal_fee,
                          withdrawal_limit,
                          deposit_fee
                        })
                        _currency.save((error, currency) => {
                          console.log(_currency);
                          if (error) {
                              console.log(error)
                              return res.status(400).json({
                              message: "Somthing went wrong",
                              });
                          }
                          if (currency) {
                            return res.status(201).json({
                            message: "New currency Add",
                            })
                          }
                    })  
                    
              })
      } catch {
          return res.status(400).json({ error: error})
  }

}
