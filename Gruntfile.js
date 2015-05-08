process.env.NODE_ENV = 'production'; //XXX hack for envify
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					// Can be nested, compact, compressed, expanded
					style: 'expanded'
				},
				files: {
					'css/welcome-panel.css': 'css/scss/welcome-panel.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				// Task-specific options go here.
			},
			global: {
				options: {
					browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 8', 'ie 9'],
					map: true
				},
				src: 'css/*.css'
			},
		},
		watch: {
			css: {
				files: ['css/scss/*.scss', 'css/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'notify:css'],
				options: {
					livereload: true,
					spawn: false,
				}
			},
			php: {
				files: ['*.php', '**/*.php', '**/**/*.php'],
				options: {
					livereload: true,
					spawn: false,
				}
			},
			browserify: {
				files: ['client/*.js', 'client/**/*.js', 'client/components/*.jsx'],
				tasks: ['browserify', 'notify:js']	
			}
		},

		notify: {
			js: {
				options: {
					message: 'JS rebuilt' 
				}
			},
			css: {
				options: {
					message: 'CSS rebuilt'
				}
			}
		},

		minifyify: {
			options: {
				'inputFolder' : 'js',
				'outputFolder' : 'js'
			}
		},

		browserify: {
			options: {
				debug: true,
				transform: ['reactify', 'envify'],
				extension: ['.jsx'],
			},
			app: {
				src:        'client/jetpack-start.js',
				dest:       'js/jetpack-start.js'
			},
			shims: {
				src: 		'client/ie-shims.js',
				dest: 		'js/ie-shims.js'
			}
		},

		envify: {
			options: {

			}
		}
	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-envify');
	grunt.loadNpmTasks('grunt-minifyify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-concat');     // concatenate
	grunt.loadNpmTasks('grunt-contrib-uglify');     // minify
	grunt.loadNpmTasks('grunt-contrib-watch');      // watch files for changes
	grunt.loadNpmTasks('grunt-contrib-sass');       // Gettin Sassy!
	grunt.loadNpmTasks('grunt-autoprefixer');       // Auto-freaking-prefixer!!!

	grunt.registerTask('default', ['watch']);

};
