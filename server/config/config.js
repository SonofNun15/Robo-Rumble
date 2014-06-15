var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = function(environment) {
	var configurations = {
		development: {
			dbConnectionString: 'mongodb://localhost/robo-rumble',
			rootPath: rootPath,
			port: process.env.PORT || 3030,
		},
		production: {
			dbConnectionString: 'mongodb://dev:dev@ds049219.mongolab.com:49219/robo-rumble-db',
			rootPath: rootPath,
			port: process.env.PORT || 80,
		},
	};
	
	if (configurations[environment] == null) {
		return configurations.development;
	} else {
		return configurations[environment];
	}
};