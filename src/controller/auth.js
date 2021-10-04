const User = require("../models/user");

exports.registerUser = (req, res) => {
    console.log(req.body)
            User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (user) return res.status(400).json({ message: "user already registered" });
            
                const { email, password, conform_password, parent_ref_code } = req.body;
                if(password !== conform_password){
                    return res.status(400).json({
                        message: "Enter same password"})
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


exports.login = (req, res) => {

}







//https://stackoverflow.com/questions/61291289/delete-the-associated-blog-posts-with-user-before-deleting-the-respective-user-i