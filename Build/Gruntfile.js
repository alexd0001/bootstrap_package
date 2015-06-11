module.exports = function(grunt) {

	/**
	 * Project configuration.
	 */
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			root: '../',
			resources: '<%= paths.root %>Resources/',
			less: '<%= paths.resources %>Private/Less/',
			css: '<%= paths.resources %>Public/Css/',
			js: '<%= paths.resources %>Public/JavaScript/'
		},
		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				advanced: false
			},
			theme: {
				src: '<%= paths.css %>theme.css',
				dest: '<%= paths.css %>theme.min.css'
			}
		},
		uglify: {
			options: {
				compress: {
					warnings: false
				},
				mangle: true,
				preserveComments: 'some'
			},
			responsiveimages: {
				src: '<%= paths.js %>Libs/jquery.responsiveimages.js',
				dest: '<%= paths.js %>Libs/jquery.responsiveimages.min.js'
			},
			viewportfix: {
				src: '<%= paths.js %>Libs/windowsphone-viewportfix.js',
				dest: '<%= paths.js %>Libs/windowsphone-viewportfix.min.js'
			},
			main: {
				src: '<%= paths.js %>main.js',
				dest: '<%= paths.js %>main.min.js'
			}
		},
		less: {
			theme: {
				src: '<%= paths.less %>Theme/theme.less',
				dest: '<%= paths.css %>theme.css'
			}
		},
		watch: {
			less: {
				files: '<%= paths.less %>**/*.less',
				tasks: 'less'
			}
		},
		bowercopy: {
			options: {
				clean: false,
				report: false,
				runBower: false,
				srcPrefix: 'bower_components/'
			},
			all: {
				options: {
					destPrefix: '<%= paths.resources %>'
				},
				files: {
					// RespondJs
					'Public/JavaScript/Libs/respond.min.js': 'respond/dest/respond.min.js',
					// jQuery
					'Public/JavaScript/Libs/jquery.min.js': 'jquery/dist/jquery.min.js',
					// Bootstrap
					'Private/Less/Bootstrap': 'bootstrap/less',
					'Public/JavaScript/Libs/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js'
				}
			}
		}
	});

	/**
	 * Register tasks
	 */
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-bower-just-install');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-npm-install');

	/**
	 * Grunt update task
	 */
	grunt.registerTask('update', ['npm-install', 'bower_install', 'bowercopy']);
	grunt.registerTask('build', ['update', 'less', 'cssmin', 'uglify']);

};