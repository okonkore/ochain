var http = require('http');
var mysql = require('mysql');
var crypto = require('crypto');
var squel = require('squel');

var pool = mysql.createPool({
	connectionLimit : 60,
	host:'localhost',
	user:'root',
	database:'ochain'
});
pool.on('connection', function (connection) {
	console.log('connection');
});
pool.on('enqueue', function(){
	console.log('enqueue');
})

http.createServer(function(req,res){
	var id = 100000000 + Math.floor( Math.random() * 900000000 );
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
				console.error(err.stack);
				res.writeHead(500,{"Content-Type":"text/html"});
				res.end(err.stack);
			}
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end(sql);
		});
	});
}).listen(1337,"160.16.213.168");
