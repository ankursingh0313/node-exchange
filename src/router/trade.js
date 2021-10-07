const express = require('express');
const { trade_history } = require('../controller/trade');
const router = express.Router();






router.post("/trade_history", trade_history);




module.exports = router;