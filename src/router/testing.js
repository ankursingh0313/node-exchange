const express = require('express');
const router = express.Router();
const { createSellOrderStack, createBuyOrderStack, createOrderHistory } = require('../controller/testing');
router.get("/test/add_sell_order", createSellOrderStack);
router.get("/test/add_buy_order", createBuyOrderStack);
router.get("/test/add_order_history", createOrderHistory);



module.exports = router;