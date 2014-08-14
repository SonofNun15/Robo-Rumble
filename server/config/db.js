var mongoose = require('mongoose');

module.exports = function(config) {
	// MONGO DB
	mongoose.connect(config.dbConnectionString);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function() {
		console.log('robo-rumble db opened');
	});
};