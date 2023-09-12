var express = require('express');
var router = express.Router();
var mysql = require('mysql2'); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

require('dotenv').config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

router.get('/new-items', function(req, res, next) {
  connection.query('SELECT * FROM items WHERE date_added > DATE_SUB(NOW(), INTERVAL 1 MONTH);', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

module.exports = router;