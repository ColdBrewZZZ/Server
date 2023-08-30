var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
 
router.post('/', function(req, res, next) {
    const {email} = req.body;
    
    //create JWTs

    const accessToken = jwt.sign(
        {"email": email},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m'}
    );
    const refreshToken = jwt.sign(
        {"email": email},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
    );

    // future: put log out 
    
    
    const resetLink = `http://localhost:3001/PasswordReset`
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
        html: `<h1>Click link to reset your password</h1><a href=${resetLink}>Reset Password Here</a>`
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.json({ accessToken });


  });

  module.exports = router;