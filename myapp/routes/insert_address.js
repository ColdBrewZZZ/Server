var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const {connection} = require('../db/config')


router.use(express.json());


router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM address', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


router.post('/', function (req, res, next) {
  
  const { user_id, title, first_name, last_name, street_address, apt, city, state, zip_code } = req.body;

  
  const insertQuery = `
    INSERT INTO address (user_id, title, first_name, last_name, street_address, apt, city, state, zip_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  
  connection.query(
    insertQuery,
    [user_id, title, first_name, last_name, street_address, apt, city, state, zip_code],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

     
      res.status(201).json({ message: 'address row added successfully', insertedId: result.insertId });
    }
  );
});

module.exports = router;