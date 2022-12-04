

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*'
	}
});

const port = process.env.PORT || 5000;

app.get('/', function(req, res) {
	res.send('hello world')
});

io.on("connection", (socket) => {
	
	console.log("client connected " + socket.id)

	socket.on('join-room', (data) => {
		console.log(`${data.username} joined room ${data.room_id} at floor ${data.floor_id}`)
		io.emit('join-room', data)
	})

	socket.on('leave-room', (data) => {
		console.log(`${data.username} has left room ${data.room_id} at floor ${data.floor_id}`)
		io.emit('leave-room', data)
	})

	socket.on('change-avatar', (data) => {
		console.log(`${data.username} has change avatar to ${data.userAvatar}`)
		io.emit('change-avatar', data)
	})

	socket.on('change-status-mic', (data) => {
		console.log(`${data.username} has change mic`)
		io.emit('change-status-mic', data)
	})

	socket.on('change-status-speaker', (data) => {
		console.log(`${data.username} has change speaker`)
		io.emit('change-status-speaker', data)
	})

	socket.on('create-new-room', (data) => {
		console.log(`${data.username} has created new room ${data.room_name} at floor ${data.floor_id}`)
		io.emit('create-new-room', data)
	})

	socket.on('change-login-status', (data) => {
		console.log(`${data.username} has change status login at floor ${data.floor_id}`)
		io.emit('change-login-status', data)
	})

	socket.on('create-new-floor', (data) => {
		console.log(`${data.username} has created new floor ${data.name}`)
		io.emit('create-new-floor', data)
	})

	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnected`)  
	})
});

server.listen(port, () => {
	console.log('listening on port ' + port);
});