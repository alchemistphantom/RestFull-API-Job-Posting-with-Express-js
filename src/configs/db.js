const config = require('./configs');
const mysql = require('mysql');

const connection = mysql.createConnection(config.database.mysql);
connection.connect(function(err) {
  if (err) {
    console.log(`ERROR ${err}`);
  } else {
    console.log('DB Connected');
  }
});

module.exports = connection;
