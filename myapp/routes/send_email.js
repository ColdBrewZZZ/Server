var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');



 
router.post('/', function(req, res, next) {
    const {email} = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'z.g.bradford@gmail.com',
          pass: 'ojepflcvkgsrsrvj'
        }
      });
      
      var mailOptions = {
        from: 'z.g.bradford@gmail.com',
        to: [email],
        subject: 'Link for ALORS account password reset',
        html: '<h1>Click link to reset your password</h1><a href="http://localhost:3001/PasswordReset">Reset Password Here</a>'
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


  });

  module.exports = router;