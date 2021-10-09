const nodemailer = require('nodemailer')
/**
 * transapoter is an object, will be used in sending email from our server
 */
const from = 'masterji790@gmail.com';
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: from, 
      pass: 'ayushdubey001',
    },
  });

function sendOTP(to, otp) {
    // will create dataset
    const subject = "OTP Varification";
    const message = `Your exchange otp is ${otp}, please don't share it with anyone.`
    sendMail({to, subject, message});
}

function sendMail(data) {
    try {
        const {to, subject, message} = data;
        let info =  {
            from: from, 
            to: to,
            subject: subject, 
            text: message, 
            // html: "your OTP is ${otp}",
        };
        transporter.sendMail(info, (function(error, data){
            if(error){
                console.log("error occurs", error)
            } else {
              console.log("email sent")
            }
        }));
    } catch(error) {
        console.log("Error: ", error.message);
    }
}

// otpValidate = (otp, inputText) => {
//     if(otp == inputText){
//         return res.status(200).json({msg: " otp Verifide"})
//     } else {
//         return res.status(200).json({msg: " otp Verifide"})
//     }  
// }

module.exports = {
    sendOTP,
    sendMail
}
  

  