// APP INIT
var express = require('express');

// Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var environment = process.env.NODE_ENV;

var app = express();


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

// ROUTING
app.use(loggingProcessor);
app.use(stylusPreprocessor);
app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {
	res.render('index');
});

// LAUNCH SERVER
var port = 3030;

app.listen(port);

console.log('Listening on port ' + port + '...');
