
const Currency = require('../models/suppoted_currency')

exports.suppoted_currency= (req, res) => {

    Currency.findOne()
    .exec((error, curr) => {
        console.log(curr)
        if (curr) return res.status(400).json({ message: "user already registered" });
    
        // const { email, password, conform_password, parent_ref_code } = req.body;
        // if(password !== conform_password){
        //     return res.status(400).json({
        //         message: "Enter same password"})
        // }
    })
}