//Instanciation de Socket.io

var express = require('express')
  , http = require('http'),
  csv = require('csv');

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
	socket.on('box_content', function (message) {
		console.log(message);
		socket.broadcast.emit('show_content_box', message);
	});
	socket.on('play_video', function (message) {
		console.log('play');
		socket.broadcast.emit('launch_video', message);
	});
	socket.on('empty_video', function (message) {
		console.log('play');
		socket.broadcast.emit('blank_video', message);
	});	
});

app.use('/assets', express.static(__dirname + '/assets'));




//Page "télécommande"

app.get('/remote', function(req, res){
	fs = require('fs');
	parse = require('csv-parse');
	var boxes = '';
	// Using the first line of the CSV data to discover the column names
	var parser = parse({delimiter: ';', columns : true}, function(err, data){
		boxes = data;
		res.render('remote', {
		boxes : boxes
	});
	  
	});
	fs.createReadStream(__dirname+'/boxes.csv').pipe(parser);
});

app.get('/screen', function(req, res){
	res.render('screen');
});

