// APP INIT
var stylus = require('stylus');
var morgan = require('morgan');

module.exports = function(app, config) {
	// VIEWS
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');

	// STYLUS
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}

	var stylusPreprocessor = stylus.middleware({
			src: config.rootPath + '/public',
			compile: compile,
		});

	app.use(stylusPreprocessor);

	// LOGGING
	var loggingProcessor = morgan();

	app.use(loggingProcessor);
};