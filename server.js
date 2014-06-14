// APP INIT
var express = require('express');

// Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var environment = process.env.NODE_ENV;

var app = express();

function getDBConnectionStringForEnvironment() {
	if (environment === 'development') {
		connectionString = 'mongodb://localhost/robo-rumble';
	} else {
		connectionString = 'mongodb://dev:dev@ds049219.mongolab.com:49219/robo-rumble-db';
	}
}

// STYLUS
var stylus = require('stylus');

function compile(str, path) {
	return stylus(str).set('filename', path);
}

var stylusPreprocessor = stylus.middleware({
		src: __dirname + '/public',
		compile: compile,
	});

// VIEWS
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// LOGGING
var morgan = require('morgan');
var loggingProcessor = morgan();

// MONGO DB
var mongoose = require('mongoose');

var connectionString = getDBConnectionStringForEnvironment();
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function() {
	console.log('robo-rumble db opened');
});

// ROUTING
app.use(loggingProcessor);
app.use(stylusPreprocessor);
app.use(express.static(__dirname + '/public'));

app.get('/partials/*', function(req, res) {
	res.render('../../public/app/' + req.params[0]);
});

app.get('/new/*', function(req, res) {
	res.render('new');
});

app.get('/continue/*', function(req, res) {
	res.render('continue');
});

app.get('/watch/*', function(req, res) {
	res.render('watch');
});

app.get('*', function(req, res) {
	res.render('index');
});

// LAUNCH SERVER
var port = process.env.PORT || 3030;

app.listen(port);

console.log('Listening on port ' + port + '...');
