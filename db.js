var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host:'localhost',
	user:'root',
	database:'ochain'
});

exports.query = function(sql){
	return new Promise(function(resolve ,reject){
		pool.getConnection(function(err, connection) {
			if(err){
				console.error(err.stack);
				reject(err);
			}
			connection.query(sql, function (err, results, fields) {
				connection.release();
				if(err){
					reject(err);
				}
				resolve(results);
			});
		});
	});
};
