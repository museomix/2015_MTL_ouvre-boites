//Instanciation de Socket.io

var express = require('express')
  , http = require('http');

var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);
var swig  = require('swig');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', false);
swig.setDefaults({ cache: false });

//Vérification bon fonctionnement réception
io.sockets.on('connection', function (socket) {
	socket.on('box_selected', function (message) {
		console.log('test');
		socket.broadcast.emit('show_box', message);
	});	
});

app.use('/assets', express.static(__dirname + '/assets'));




//Page "télécommande"

app.get('/remote', function(req, res){
  	res.render('remote');
});

