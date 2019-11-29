var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var express = require('express');

app.use(express.static('./utils/'));

app.get('/site', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res) {
	res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
	});
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', function(socket) {
	socket.broadcast.emit('hi');
});

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
