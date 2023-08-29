var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'z.g.bradford@gmail.com',
      pass: 'ojepflcvkgsrsrvj'
    }
  });
  
  var mailOptions = {
    from: 'z.g.bradford@gmail.com',
    to: 'snubby601@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 
router.get('/', function(req, res, next) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


  });

  module.exports = router;