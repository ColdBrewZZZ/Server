var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
router.use(bodyParser.json());


const {connection} = require('../db/config')

router.use(cookieParser());


router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


router.get('/user', function (req, res, next) {
  const id = req.cookies.userID;
  console.log("this is the id", id);
  console.log('Cookies:', req.cookies);
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});


let loggedInUserId = ''


router.post('/login', function (req, res, next) {
  const { email, password } = req.body;
 

  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      const user = results[0];

     
      if (password === user.password) {
        res.cookie("userID", user.id, {
          domain: 'localhost'
        });
        loggedInUserId = user.id;
        res.json({ success: true });
  
        
  
      } else {
     
        res.json({ success: false });
      }
    } else {

      res.json({ success: false });
    }
  });
});

// Endpoint to set a cookie
router.get('/set-cookie', function(req, res, next) {
 
    res.cookie("userID", loggedInUserId, {
      domain: 'localhost'
    });
  
    res.send('Cookie set!');
}); 
  
router.get('/get-cookie', (req, res) => {
  console.log(req.cookies)
  res.send(req.cookies)
});

router.get('/del-cookie',(req,res) => {
  res.clearCookie('userID')
  res.send('cookie was deleted')
})

// router.get('/private-area', auth, (req, res) => {

// });

module.exports = router;