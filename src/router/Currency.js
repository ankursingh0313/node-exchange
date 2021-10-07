const express = require('express');
const {suppoted_currency} = require('../controller/Currency');
const router = express.Router();

router.get("/suppotedCurrency", suppoted_currency);
// router.post('/signup', signup);
// router.post('/signin', signin);

module.exports = router;