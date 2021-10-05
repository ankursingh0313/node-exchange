
const Currency = require('../models/suppoted_currency')


exports.suppoted_currency= async(req, res) => {
    try {
        const places = await Currency.find();
        res.status(200).json({ places });
      } catch (error) {
        res.status(400).json({ message: `${error}` });
      }
};