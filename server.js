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
	var id = 100000000 + Math.floor( Math.random() * 900000000 );
	var sql = squel
	.insert()
	.into("user")
	.set("id", id)
	.set("name", id)
	.set("create_time",squel.str("now()"))
	.toString();

	connection.query(sql, function (err, results, fields) {
		if(err){
			console.error(err.stack);
			res.writeHead(500,{"Content-Type":"text/html"});
			res.end(sql);
		}else{
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end(sql);
		}
	});

}).listen(1337,"160.16.213.168");
