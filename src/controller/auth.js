const config = require('../models/config');
const bcrypt = require('bcrypt')



exports.registerUser = (req, res, next) => {
    console.log(req.body)
    try {
       config.query(
            `SELECT * FROM user WHERE email='${req.body.email}'`,function (err,result){
                if(err) throw err;
                if(result.length!=0)
                res.status(200).json({msg:"email already exist!"});
                const hashPass =  bcrypt.hash(req.body.password, 12);
                config.query(`INSERT INTO user(email,password) VALUES('${req.body.email}','${hashPass}')`,function (err,rows){
                    if (err) {
                        res.status(201).json({ error: 'Your registration has failed.',res:err })
                        }
                        else {
                        res.status(400).json({ message: 'You have successfully registered.' })
                        }
                });
            });
    } catch (e) {
        next(e);
    }
}

exports.loginUser = (req, res) => {
    console.log(req.body)
    try{
    config.query(
        `SELECT * FROM user WHERE email='${req.body.email}'`,function (err, user){
            if(err) throw err;
            if(user.length==0){
                res.status(400).json({ message: 'invalide email and password'})
            }else {
                        //   bcrypt.compare(req.body.password, user[0].password, function(err, res) {
                        //       if(err) throw err;
                        //       res.status(400).json({ message: " login successfully"})
                        //   });
                        res.status(500).json({ hash:user[0].password});
            }
        })

    }catch{
    
    }
} 



// function authenticate()
//     email= req.body.email;
//     userName= req.body.name;
//      token_name = req.body.token_name;
//      token_id = req.body.token_id;
    
//     if(!validate_email(email))
//     {
//         res.status(200).json({ message: 'Invalid Email.'})
//     }
    
//      password = req.body.password;
    //  hash_pass=md5( password);
    
    //  valid=time()+300;
    //  user_id=rand(111,999).random_strings(3).rand(111,999);
    //  token=random_strings(20);
    //  self_ref=random_strings(5);
    //  gsql="select * from user where email='", token_id,"'";
    //  grs=mysqli_query( con, gsql);
//     if(mysqli_num_rows( grs)>0)
//     {   
//         res.status(200).json({ message: "Somthing Wrong!!"})
//     }
//     else
//     {
//             if(!isUnique("user","email","id", email))
//             {
//                 res.status(200).json({ message: "Email Already Exist."})
        
//             }
                       
//                 sql="INSERT INTO `user`(`user_id`,`email`, `password`, `created_on`, `created_on_time`, `self_ref_code`, `user_role`, `loginToken`, `tokenValid`) VALUES ('','','','','','','','','')"
//                 if(mysqli_query( con, sql)) {
//                      tsql="INSERT INTO `token_owner` (`user_name`, `token_name`, `user_id`) VALUES ('','','');";
//                     mysqli_query( con, tsql);
//                      subject="Token Account Detail";
//                      msg1= email;
//                      msg2= password;
//                      msg3=SITE_ADMIN_URL,"login";
//                     if( base_url || 'http://localhost/'){
//                       send_otp_mail( email, subject, userName, msg1, msg2, msg3);
//                     }
//                     req.status(400).json({ message: "Mail Sent To user"})
                    
//                 } else {
//                     req.status(400).json({ message: "Somthing went Wrong!!r"})
            
//                 }
//     }
// }
        
//         req.assert('password', 'Password is required').notEmpty()   //Validate password
//         req.assert('email', 'A valid email is required').isEmail()  //Validate email
//         req.assert('referral', 'Name is required')           //Validate name
//         let errors = req.validationErrors()
//         if( !errors ) {   //No errors were found.  Passed Validation!
//         let user = {
//         email: req.sanitize('email').escape().trim(),
//         password: req.sanitize('password').escape().trim(),
//         referral: req.sanitize('referral').escape().trim()
//         }
//         connection.query('INSERT INTO users SET ?', user, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 res.json(200).json({ error })                
//             } else {     
//                 res.json(200).json({ message: "You have successfully signup!" })            
//             }
//         }
//                     const {
//                 email,
//                 password,
//                 referral
//             } = req.body;
//             if(user) {
//                 isUniqe();
//                 con.query("SELECT * FROM user",function(err, result){
//                         res.send(result)
//                 })
//             }
//         )}
    

