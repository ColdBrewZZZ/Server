var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

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
    console.log('cookie', req.cookies.userID);
    const user_id = req.cookies.userID;
    const date = new Date();
  
    const { title, first_name, last_name, street_address, apt, city, state, zip_code, order_status, phone, items } = req.body;
  
    const insertAddressQuery = `
      INSERT INTO address (user_id, title, first_name, last_name, street_address, apt, city, state, zip_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertOrderDetailsQuery = `
    INSERT INTO order_details (order_id, item_id, quantity, price)
    VALUES (?, ?, ?, ?)
     `;
  
    connection.query(
      insertAddressQuery,
      [user_id, title, first_name, last_name, street_address, apt, city, state, zip_code],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        const insertedAddressId = result.insertId;
  
        const insertOrdersQuery = `
          INSERT INTO orders (user_id, date, order_status, phone, address_id)
          VALUES (?, ?, ?, ?, ?)
        `;
  
        connection.query(
          insertOrdersQuery,
          [user_id, date, order_status, phone, insertedAddressId],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
            }
  
            const order_id = result.insertId;

            //insert order details 
            items.forEach(item => {
                const { id: item_id, quantity, price } = item;

                connection.query(
                    insertOrderDetailsQuery,
                    [order_id, item_id, quantity, price],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                    }
                );
            });

            res.status(201).json({ message: 'orders row created successfully', insertedId: order_id });

            
          }
        );
      }
    );
  });

module.exports = router;