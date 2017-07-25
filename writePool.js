var mysql = require('mysql');

var writepool = mysql.createPool({
	connectionLimit: 500,
	host: 'edissdatabase.ctpoqk8h72ri.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'root',
	password: 'password',
	database: 'edissproject2'
});

module.exports = writepool