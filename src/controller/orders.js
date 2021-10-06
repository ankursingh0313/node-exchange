// const User = require("../models/Orders");
// import { checkUserBalance } from '../utils/validator';
exports.sellOrder = (req, res) => {
    const SellStack = require('../models/sell_stack');
    console.log(req.body);
    return res.json({
        status: 200
    })
    // console.log(req.body)
    // User.findOne({ email: req.body.email })
    //     .exec((error, user) => {
    //         if (user) return res.status(400).json({ message: "user already registered" });

    //         const { email, password, conform_password, parent_ref_code } = req.body;
    //         if (password !== conform_password) {
    //             return res.status(400).json({
    //                 message: "Enter same password"
    //             })
    //         }

    //         const _user = new User({
    //             email,
    //             password,
    //             conform_password,
    //             parent_ref_code,
    //             user_id: Math.random().toString(),
    //         });
    //         _user.save((error, data) => {
    //             console.log(_user);
    //             if (error) {
    //                 console.log(error)
    //                 return res.status(400).json({
    //                     message: "Somthing went wrong",
    //                 });
    //             }
    //             if (data) {
    //                 return res.status(201).json({
    //                     message: "user created successfully",
    //                 });
    //             }
    //         });
    //     });
};


exports.buyOrder = (req, res) => {
    const User = require("../models/Orders");
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {

            if (user.authenticate(req.body.password)) {
                const { _id, email } = user
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

                res.status(200).json({
                    token,
                    user: {
                        _id, email
                    }
                })
            } else {
                return res.status(400).json({ message: "Invalide username and password" })
            }
        } else {
            return res.status(400).json({ message: "Somthing went wrong" })
        }
    })
}


