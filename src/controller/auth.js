const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { createUniqueID } = require("../utils/functions");




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

                const _user = new User({
                    email,
                    password,
                    conform_password,
                    parent_ref_code,
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
                    
                    return res.status(201).json({
                    message: "user created successfully",
                    })
                    
                
                    
                }
                });
            });
};


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