//Instanciation de Socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var swig  = require('swig');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', false);
swig.setDefaults({ cache: false });

//Vérification bon fonctionnement réception
io.sockets.on('connection', function (socket) {
	socket.on('mouse_position', function (message) {
		console.log('X: ' + message.mx + '/ Largeur ' + message.maxX);
	});	
});

app.use('/assets', express.static(__dirname + '/assets'));


http.listen(8080, function(){
  console.log('En attente sur *:3000');
});

//Page "télécommande"

app.get('/remote', function(req, res){
  	res.render('remote');
});