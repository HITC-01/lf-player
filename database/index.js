const mysql = require('promise-mysql');

module.exports = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'soundcloud',
});
