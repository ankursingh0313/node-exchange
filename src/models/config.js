const mysql = require('mysql2');
 
const config = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bitbtf"
  });

  config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  module.exports = config