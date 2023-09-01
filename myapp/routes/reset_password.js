var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sqldoawk1!',
  database: 'alors',
});


router.use(express.json());


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



router.post('/', function (req, res, next) {
  const { password, token } = req.body;

  try {
   
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedToken.email;

    const insertQuery = `UPDATE users SET password=? WHERE email=?`;

    connection.query(
      insertQuery,
      [password, email],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(201).json({ message: 'User password changed successfully', insertedId: result.insertId });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(401).send('Invalid token'); 
  }
});

module.exports = router;
