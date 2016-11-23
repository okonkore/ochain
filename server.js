var http = require('http');
var mysql = require('mysql');
var crypto = require('crypto');

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
    connection.query('insert into `user` (`user`, `name`, `create_time`) values (\'' + crypto.randomBytes(8).toString('hex') + '\',now(),now())');
}).listen(1337,"160.16.213.168");
