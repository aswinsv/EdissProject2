var mysql = require('mysql');

var connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'edissdatabase.ctpoqk8h72ri.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'edissproject2',
    debug: false
});

module.exports = connectionPool