(function() { // limit use strict to this function
	'use strict';

	module.exports = function configureGrunt(grunt) {
		
		var clientJsFiles = [
		  'public/app/**/*.js',
		  'domain/**/*.js',
		  '*.js',
		  'server/config/**/*.js'
		];

		//Load tasks in node modules starting with "grunt-" prefix
		require('matchdep')
			.filterDev('grunt-*')
			.forEach(grunt.loadNpmTasks);

		grunt.initConfig({
			karma: {
				'default': {
					configFile: 'karma.conf.js',
					singleRun: true,
					reporters: ['dots', 'progress'],
				},
				debug: {
					configFile: 'karma.conf.js',
					singleRun: false,
					reporters: ['dots', 'progress'],
				},
			},
			
			watch: {
				clientjs: {
					files: clientJsFiles,
					options: { livereload: true },
					tasks: ['test']
				}
			},

			jsvalidate: {
				files: clientJsFiles
			},
			jshint: {
				files: clientJsFiles,
				options: {
					jshintrc: true
				}
			},
		});

		// karma test environments stay open so that you can debug the test code in the browser
		grunt.registerTask('test', ['karma:default']);
		grunt.registerTask('debug', ['karma:debug']);
		
		grunt.registerTask('run', ['jsvalidate', 'jshint', 'test']);
		
		//defaults
		grunt.registerTask('default', ['run']);
	};
}());