var express = require('express');

module.exports = function(app, config) {
	app.use(express.static(config.rootPath + '/public'));

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
};