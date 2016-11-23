var http = require('http');
var mysql = require('mysql');
var crypto = require('crypto');
var squel = require('squel');

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'ochain'
});

connection.connect(function(err){
	if(err){
		console.error(err.stack);
	}
});

http.createServer(function(req,res){
	console.log(
		squel.insert().into("user").set("id",111).set("name", "hogefuga").set("create_time","now()").toString()
	);
}).listen(1337,"160.16.213.168");
