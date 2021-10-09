const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { createUniqueID, generateOTP } = require("../utils/functions");
const { sendOTP } = require("../utils/mailer");

exports.registerUser = (req, res) => {
    console.log(req.body)
            User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (user) return res.status(200).json({ message: "user already registered" });
            
                const { email, password, conform_password, parent_ref_code } = req.body;
                if(password !== conform_password){
                    return res.status(200).json({
                        message: "Enter same password"})
                }
                const otp = generateOTP();
                const _user = new User({
                    email,
                    password,
                    conform_password,
                    parent_ref_code,
                    email_otp: otp+'_' + Date.now(),
                    user_id: createUniqueID(type = 'user'),
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
                    sendOTP(_user.email, otp);
                    return res.status(201).json({
                    message: "user created successfully",
                    })
                    
                
                    
                }
                });
            });
};

exports.verifyUser = async (req, res) => {
    const { verifyOTP } = require("../utils/validator");
    try {
        const {otp, user_id} = req.body;
        // fetch email_otp of perticular user
        const user_data = await User.findOne({user_id});
        if (user_data) {
            const isVarified = verifyOTP(otp, user_data.email_otp);
            if (isVarified) {
                // update user email varification status
                await User.updateOne({user_id: user_id}, {
                    $set: {
                        is_email_verified: true
                    }
                })
                return res.json({
                    status: 200,
                    error: false,
                    message: 'Email Varified!',
                    data: {
                        user_id: user_id
                    }
                })
            } else {
                res.json({
                    status: 400,
                    error: true,
                    message: 'Please provide valid OTP!'
                })
            }
        } else {
            res.json({
                status: 400,
                error: true,
                message: 'Invalid User!'
            })
        }
    } catch (error) {
        console.log("Err from: controller > auth > verifyUser > try: ", error.message)
        res.json({
            status: 400,
            error: true,
            message: 'Please provide valid OTP!'
        })
    }
}

exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {

            if(user.authenticate(req.body.password)){
                const { _id, email } = user
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'1h' })

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







//https://stackoverflow.com/questions/61291289/delete-the-associated-blog-posts-with-user-before-deleting-the-respective-user-i