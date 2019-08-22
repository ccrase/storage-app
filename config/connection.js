const mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "",
    database: "storageapp_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("DB connection successful");
});

module.exports = connection;