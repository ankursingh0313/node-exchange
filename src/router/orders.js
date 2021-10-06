const express = require('express');
const { sellOrder, buyOrder } = require('../controller/orders');
const { orderValidator } = require('../utils/middleware');

const router = express.Router();

router.post("/sell-order", orderValidator, sellOrder);
router.post("/buy-order", orderValidator, buyOrder);



module.exports = router;