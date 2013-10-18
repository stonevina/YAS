module.exports = function(grunt) {

	// 配置
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		concat : {
			//合并js
			domop : {
				src: ['src/ajax.js', 'src/selector.js'],
				dest: 'dest/domop.js'
			},
			//合并css
			css : {
				src : ['src/asert/*.css'],
				dest : 'dest/asert/all.css'
			}
		},
		cssmin : {
			css : {
				src : 'dest/asert/all.css',
				dest : 'dest/asert/all-min.css'
			}
		},
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'dest/domop.js',
				dest : 'dest/domop.min.js'
			}
		}
	});
	
	// 载入concat和uglify插件，分别对于合并和压缩
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// 载入css插件，分别对于合并和压缩css
	grunt.loadNpmTasks('grunt-css');

	// 默认任务
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}; 