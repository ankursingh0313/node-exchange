// const User = require("../models/Orders");
import { validateUserId } from '../utils/validator';

exports.sellOrder = (req, res) => {
    const User = require("../models/Orders");
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({ message: "user already registered" });

            const { email, password, conform_password, parent_ref_code } = req.body;
            if (password !== conform_password) {
                return res.status(400).json({
                    message: "Enter same password"
                })
            }

            const _user = new User({
                email,
                password,
                conform_password,
                parent_ref_code,
                user_id: Math.random().toString(),
            });
            _user.save((error, data) => {
                console.log(_user);
                if (error) {
                    console.log(error)
                    return res.status(400).json({
                        message: "Somthing went wrong",
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: "user created successfully",
                    });
                }
            });
        });
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


function checkMainBalance(req, res, next) {
    // code for checking currenct user have perticular balance or not
    const data = req.body ? req.body : {};
    const user_id = data.user_id ? data.user_id : undefined;
    const currency = data.currency ? data.currency : undefined;
    const compare_currency = data.compare_currency ? data.compare_currency : undefined;
    const amount = data.amount ? data.amount : undefined;
    const price = data.price ? data.price : undefined;
    const url = req.url;
    const url_array = url.length > 0 ? url.split('/') : [];
    const url_array_length = url_array.length;
    const type = url_array.length > 0 ? url_array[url_array_length - 1] != '' ? url_array[url_array_length - 1] : url_array[url_array_length - 2]:undefined;
    
    if (validateUserId(user_id) &&
        validateCurrency(currency) &&
        validateCurrency(compare_currency) &&
        validateAmount(amount) &&
        validatePrice(price)
    ) { } else {
        return res.json({
            status: 200,
            error: true,
            message: 'Invalid Request'
        })
    }

    if (type == 'buyStack') {
        // create a buy stack after initial checks
        const balance = checkUserBalance(compare_currency);
        if (balance >= amount * price) {
            // create order
            return res.json({
                status: 200,
                error: false,
                message: 'Success',
                data: {}
            })
        } else {
            return res.json({
                status: 200,
                error: true,
                message: 'Unsufficient fund in wallet to place this order.'
            })
        }
    } else if (type == 'sellStack') {
        // create a sell stack after initial checks
        const balance = checkUserBalance(currency);
        if (balance >= amount * price) {
            // create order
            return res.json({
                status: 200,
                error: false,
                message: 'Success',
                data: {}
            })
        } else {
            return res.json({
                status: 200,
                error: true,
                message: 'Unsufficient fund in wallet to place this order.'
            })
        }
    } else {
        return res.json({
            status: 404,
            error: true,
            message: 'Endpoint did not found'
        })
    }
}

//https://stackoverflow.com/questions/61291289/delete-the-associated-blog-posts-with-user-before-deleting-the-respective-user-i