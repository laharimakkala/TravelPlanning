var mysql = require("mysql2");

var db = mysql.createConnection({
    host: 'localhost',
    database: 'tourism_database',
    user: 'root',
    password: 'guitarlove143'
});


module.exports = db;