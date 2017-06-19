var mysql = require('mysql');

var connectionPool = mysql.createConnection({
    connectionLimit: 100,
    host: 'edissdatabase.ctpoqk8h72ri.us-east-1.rds.amazonaws.com',
    port:3306,
    user: 'root',
    password: 'password',
    database: 'edissproject2'
});
connectionPool.connect();
module.exports = connectionPool