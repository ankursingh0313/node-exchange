const express = require('express');
const suppoted_currency = require('../controller/Currency');
const Currency = require('../models/suppoted_currency')

const router = express.Router();


router.get("/suppotedCurrency", (req, res) => {
    const id = '615ab6a381585f24b227632f';
    Currency.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
    });
});

module.exports = router;
