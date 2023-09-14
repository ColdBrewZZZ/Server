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
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

router.get('/:id', function(req, res, next) {
    const itemId = req.params.id;
  
  
    if (!Number.isInteger(+itemId) || +itemId <= 0) {
      res.status(400).send('Invalid category ID');
      return;
    }
  
    const query = 'SELECT * FROM categories WHERE id = ?';
    connection.query(query, [itemId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
  
      if (results.length === 0) {
        res.status(404).send('Item not found');
        return;
      }
  
      res.json(results[0]);
    });
  });

module.exports = router;