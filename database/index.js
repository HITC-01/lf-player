const mysql = require('promise-mysql');
// const

// TODO: put these vars in process.env
module.exports = mysql.createPool({
  user: 'root',
  database: 'soundcloud',
});
