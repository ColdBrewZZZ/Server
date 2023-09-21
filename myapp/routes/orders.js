var express = require('express');
var router = express.Router();
var mysql = require('mysql2'); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const {connection} = require('../db/config')


router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});


router.get('/order_details', function(req, res, next) {
  connection.query('SELECT * FROM order_details', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

router.post('/', function (req, res, next) {
  
  const { user_id, date, order_status, phone, address_id } = req.body;

  
  const insertQuery = `
    INSERT INTO orders (user_id, date, order_status, phone, address_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  
  connection.query(
    insertQuery,
    [user_id, date, order_status, phone, address_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

     
      res.status(201).json({ message: 'orders row created successfully', insertedId: result.insertId });
    }
  );
});


router.post('/order_details', function (req, res, next) {
  
  const { order_id, item_id, quantity, price} = req.body;

  
  const insertOrderDetailsQuery = `
    INSERT INTO order_details (order_id, item_id, quantity, price)
    VALUES (?, ?, ?, ?)
  `;

  
  connection.query(
    insertOrderDetailsQuery,
    [order_id, item_id, quantity, price],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

     
      res.status(201).json({ message: 'order_details row created successfully', insertedId: result.insertId });
    }
  );
});

module.exports = router;


