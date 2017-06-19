var mysql = require('mysql');

var connectionPool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'edissproject2',
    debug: false
});

module.exports = connectionPool