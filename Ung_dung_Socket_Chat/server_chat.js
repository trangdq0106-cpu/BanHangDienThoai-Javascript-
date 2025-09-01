var socketIO = require('socket.io');
var http = require('http');
var port = process.env.PORT || 8080;
var ip = process.env.IP || '127.0.0.1';
server = http.createServer();
server.listen(port,ip, function () {
	console.log('server dang chay!');
});



var	io = socketIO.listen(server);
io.set('match origin procotol', true);
io.set('origins', '*:*');

var run = function (socket) {
	socket.emit('access', 'Access successfully!');
	socket.on('send_msg', function (id, msg) {
		console.log("id  la ----> " + id + " | noi dung: " + msg);
		//socket.emit('send_back', id, msg);
		//socket.broadcast.emit('send_back_all', id, msg);
		io.sockets.emit('send_back_all',id,msg);

	});
}
io.sockets.on('connection', run);