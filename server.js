var http = require('http');
var crypto = require('crypto');
var squel = require('squel');
var db = require('./db');

http.createServer(function(req,res){
	var id = 1000000000000000000 + Math.floor( Math.random() * 9000000000000000000 );
	var sql = squel
	.insert()
	.into("user")
	.set("id", id)
	.set("name", id)
	.set("create_time",squel.str("now()"))
	.toString();
	db.query().then(function(res){
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(res);
	}).catch(function(err){
		res.writeHead(500,{"Content-Type":"text/html"});
		res.end(err.stack);
	});
}).listen(1337,"160.16.213.168");
