const nodemailer = require("nodemailer");


            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, 
                auth: {
                  user: "masterji790@gmail.com", 
                  pass: "ayushdubey001",
                },
              });
            
              
              // let info =  transporter.send({
              //   from: 'masterji790@gmail.com',
              //   to: 'harshitdubey1996@gmail.com', 
              //   subject: "Hello ✔", 
              //   text: "Hello world?", 
              //   html: "<b>Hello world?</b>", 
              // });

              function sendMail(reciver, message){
                transporter.send({
                  from: 'masterji790@gmail.com',
                  to: 'harshitdubey1996@gmail.com', 
                  subject: "Hello ✔", 
                  text: "Hello world?", 
                  html: "<b>Hello world?</b>", 
                });
              }

              function createOptMail(reciver, otp){

              }
            
              // console.log("Message sent: %s", info.messageId);
            
              // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
      
        














/**
 * crete a generic function to send mail
 */
       
/**
 * create   a 
 */
        // let testAccount = await nodemailer.createTestAccount();






    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: "masterji790@gmail.com",
    //       pass: "ayushdubey001",
    //     },
    //   });
      
    //   let mailOptions = {
    //     from: 'masterji790@gmail.com',
    //     to: "harshitdubey1996@gmail.cpm",
    //     subject: `Email Varification OTP`,
    //     html: `Your OTP is 2234`,
        // attachments: [
        //   {
        //     filename: `${name}.pdf`,
        //     path: path.join(__dirname, `../../src/assets/books/${name}.pdf`),
        //     contentType: 'application/pdf',
        //   },
        // ],
    //   };
      
    //   transporter.sendMail(mailOptions, function (err, info) {
    //     if (err) {
    //       res.json(err);
    //     } else {
    //       res.json(info);
    //     }
    //   });
