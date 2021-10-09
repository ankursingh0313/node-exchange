const express = require('express');
const {suppoted_currency, addCurrency} = require('../controller/Currency');
const router = express.Router();

router.get("/suppotedCurrency", suppoted_currency);
router.post("/addCurrency", addCurrency);

// router.post('/signup', signup);
// router.post('/signin', signin);

module.exports = router;