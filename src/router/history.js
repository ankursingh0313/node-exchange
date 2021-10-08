const express = require('express');
const { trade_history, deposite_history, fundtranfer_history, crypto_transaction_history } = require('../controller/history');

const router = express.Router();






router.post("/trade_history", trade_history);
router.post("/deposite_history", deposite_history)
router.post("/fundtranfer_history", fundtranfer_history)
router.post("/crypto_transaction_history", crypto_transaction_history)





module.exports = router;