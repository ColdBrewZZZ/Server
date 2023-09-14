var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
require('dotenv').config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


router.use(express.json());


router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM user_cart', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


router.post('/', function (req, res, next) {
  
  const { user_id, item_id, quantity} = req.body;

  
  const insertQuery = `
    INSERT INTO user_cart (user_id, item_id, quantity)
    VALUES (?, ?, ?)
  `;

  
  connection.query(
    insertQuery,
    [user_id, item_id, quantity],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

     
      res.status(201).json({ message: 'user_cart updated successfully', insertedId: result.insertId });
    }
  );
});

module.exports = router;