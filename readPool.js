var mysql = require('mysql');

var readpool = mysql.createPool({
	connectionLimit: 1000,
	host: 'edissdatabase.ctpoqk8h72ri.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'root',
	password: 'password',
	database: 'edissproject4'
});

module.exports = readpool