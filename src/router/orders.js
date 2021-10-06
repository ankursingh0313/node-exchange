const express = require('express');
const { sellOrder, buyOrder } = require('../controller/orders');

const router = express.Router();

router.post("/sell-order", sellOrder);
router.post("/buy-order", buyOrder);



module.exports = router;