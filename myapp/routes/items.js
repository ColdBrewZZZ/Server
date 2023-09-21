var express = require('express');
var router = express.Router();
var mysql = require('mysql2'); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const {connection} = require('../db/config')

router.get('/All', function(req, res, next) {
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

router.get('/category:id', function(req, res, next) {
  const categoryId = req.params.id;


  if (!Number.isInteger(+categoryId) || +categoryId <= 0) {
    res.status(400).send('Invalid category ID');
    return;
  }

  const query = 'SELECT * FROM items WHERE category_id = ?';
  connection.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }


    if (results.length === 0) {
      res.status(404).send('Items not found');
      return;
    }

    res.json(results);
  });
});

router.get('/:id', function(req, res, next) {
  const itemId = req.params.id;


  if (!Number.isInteger(+itemId) || +itemId <= 0) {
    res.status(400).send('Invalid item ID');
    return;
  }

  const query = 'SELECT * FROM items WHERE id = ?';
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