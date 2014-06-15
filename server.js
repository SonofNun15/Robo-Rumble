var express = require('express');

// Init app
var app = express();

// Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var environment = process.env.NODE_ENV;

var config = require('./server/config/config')(environment);

require('./server/config/express')(app, config);

require('./server/config/routes')(app, config);

require('./server/config/db')(config);

// LAUNCH SERVER
app.listen(config.port);

console.log('Listening on port ' + config.port + '...');