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


router.get('/:id', function(req, res, next) {
  const userId = req.params.id;


  if (!Number.isInteger(+userId) || +userId <= 0) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const query = 'SELECT * FROM user_cart WHERE user_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }


    if (results.length === 0) {
      res.status(404).send('Item not found');
      return;
    }

    res.json(results);
  });
});

// insert item into user_cart
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

// delete item from user_cart
router.get('/remove/:id', function(req, res, next) {
  const itemId = req.params.id;


  if (!Number.isInteger(+itemId) || +itemId <= 0) {
    res.status(400).send('Invalid item ID');
    return;
  }

  const query = 'DELETE FROM user_cart WHERE item_id = ?';
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

    res.json(results);
  });
});



module.exports = router;