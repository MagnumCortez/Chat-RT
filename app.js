/*importas as configurações do servidor*/
var app = require('./config/server');

/*Parametrizar a porta de escuta*/
var server = app.listen(80, function () {
	console.log('Servidor online');
});

var io = require("socket.io").listen(server);

app.set('io', io); // declarando variavel global

/*criar a conexao por websocket*/
io.on('connection', function (socket) {
	console.log('Usuário conectou');

	socket.on('disconnect', function (socket) {
		console.log('Usuário desconectou');
	});

	socket.on('msgToServer', function (data) {
		/* dialogos */
		socket.emit('msgToClient', {
			name : data.name, 
			message : data.message
		});

		socket.broadcast.emit('msgToClient', {
			name : data.name, 
			message : data.message
		});

		if (parseInt(data.refresh_user) == 0) {
			/* participantes */
			socket.emit('userToClient', {
				user : data.name 

			});

			socket.broadcast.emit('userToClient', {
				user : data.name
			});
		}
	});
});



