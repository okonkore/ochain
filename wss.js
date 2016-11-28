var http = require('http');
var WebSocketServer = require('ws').Server;

var httpServer = http.createServer(function(req,res){
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.end('hoge');
});

httpServer.listen(8888,function(){
	console.log('8888');
});

var wss = new WebSocketServer({server: httpServer});
wss.on('connection',function(ws){
	console.log('connection');
	ws.on('close',function(){
		console.log('close');
	});
	ws.on('message',function(message){
		console.log(message);
		wss.clients.forEach(function(client) {
      			client.send(message);
    		});
	});
});


