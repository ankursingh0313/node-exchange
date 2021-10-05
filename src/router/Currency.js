const express = require('express');
const suppoted_currency = require('../controller/Currency');
const Currency = require('../models/suppoted_currency')
const router = express.Router();


router.get("/suppotedCurrency",  async(req, res) => {
    try {
        const places = await Currency.find();
        res.status(200).json({ places });
      } catch (error) {
        res.status(400).json({ message: `${error}` });
      }
});
// router.post('/signup', signup);
// router.post('/signin', signin);

 

module.exports = router;