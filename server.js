var http = require('http');
var mysql = require('mysql');
var crypto = require('crypto');
var squel = require('squel');

var pool = mysql.createPool({
	connectionLimit : 10,
	host:'localhost',
	user:'root',
	database:'ochain'
});

http.createServer(function(req,res){
	var id = 1000000000000000000 + Math.floor( Math.random() * 9000000000000000000 );
	var sql = squel
	.insert()
	.into("user")
	.set("id", id)
	.set("name", id)
	.set("create_time",squel.str("now()"))
	.toString();

	pool.getConnection(function(err, connection) {
		if(err){
			console.error(err.stack);
			res.writeHead(500,{"Content-Type":"text/html"});
			res.end(err.stack);
		}
		connection.query(sql, function (err, results, fields) {
			connection.release();
			if(err){
				console.error(err.message);
				res.writeHead(500,{"Content-Type":"text/html"});
				res.end(err.stack);
			}
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end(sql);
		});
	});
}).listen(1337,"160.16.213.168");
