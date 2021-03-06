// Karma configuration
// Generated on Thu Aug 14 2014 08:52:14 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
	var karmaConfig = {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon-chai'],


		// list of files / patterns to load in the browser
		files: [
		  'public/vendor/lodash/dist/lodash.js',
		  'public/vendor/angular/angular.js',
		  'public/vendor/angular-mocks/angular-mocks.js',
		  'tests/client/test-app.js',
		  'public/app/**/*.js',
		  'domain/common/point.js',
		  'domain/common/*.js',
		  'domain/**/*.js',
		  'tests/client/**/*.tests.js',
		  'tests/domain/**/*.tests.js'
		],


		// list of files to exclude
		exclude: [
		  'public/app/app.js'
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['dots', 'progress'],

		// This would be used for testing directives... it makes the html template available to angular
		// ngHtml2JsPreprocessor: {
			// // setting this option will create only a single module that contains templates
			// // from all the files, so you can load them all with module('templates')
			// moduleName: 'templates'
		// },

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome', 'Firefox', 'IE'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	};
	
	// This would be used for testing directives... it makes the html templates available to angular
	//config.preprocessors[angularPath + '*.html'] = [ 'ng-html2js' ];
	
	config.set(karmaConfig);
};
