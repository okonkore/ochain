var http = require('http');
var crypto = require('crypto');
var squel = require('squel');
var db = require('./db');

http.createServer(function(req,res){
	var id = 1000000000000000000 + Math.floor( Math.random() * 9000000000000000000 );
	Promise.resolve().then(function(){
		var sql = squel
		.insert()
		.into("user")
		.set("id", id)
		.set("name", id)
		.set("create_time",squel.str("now()"))
		.toString();
		return db.query(sql);
	}).then(function(){
		var sql = squel
		.insert()
		.into("sheild")
		.set("user_id", id)
		.set("sheild_id", 1)
		.set("create_time",squel.str("now()"))
		.toString();
		return db.query(sql);
	}).then(function(result){
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(sql);
	}).catch(function(err){
		res.writeHead(500,{"Content-Type":"text/html"});
		res.end(err.stack);
	});
}).listen(1337,"160.16.213.168");
