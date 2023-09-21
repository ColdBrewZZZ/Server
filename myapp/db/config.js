var mysql = require('mysql2'); 

require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', 
  port: 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Sqldoawk1!',
  database: process.env.DB_DATABASE || 'alors'
});

module.exports.connection = connection;