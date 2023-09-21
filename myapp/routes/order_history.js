var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const {connection} = require('../db/config')


router.use(express.json());


router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM order_details', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});




module.exports = router;