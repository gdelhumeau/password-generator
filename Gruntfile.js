module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dev: {
        src: ['src/html/headers.html', 'src/html/scripts.dev.html', 'src/html/main.html'],
        dest: 'dev/index.html',
      },
      dist: {
        src: ['src/html/headers.html', 'src/html/scripts.dist.html', 'src/html/main.html'],
        dest: 'dist/index.html',
      }
    },
    less: {
      dev: {
        files: {
          "dev/style.css": "src/less/style.less"
        }
      },
      dist: {
        files: {
          "dist/style.css": "src/less/style.less"
        }
      }
    },
    uglify: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/jquery.min.js', 'src/js/bootstrap.min.js', 'src/js/sha256.js', 'src/js/generator.js'],
        dest: 'dist/script.min.js'
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/style.min.css': ['dist/style.css']
        }
      }
    },
    copy: {
      dev: {
        files: [
          { src: ['src/media/*'], dest: 'dev/media/', expand: true, flatten:true },
          { src: ['bootstrap/dist/fonts/*'], dest: 'dev/fonts/', expand: true, flatten:true },
				  { src: 'bootstrap/dist/js/*', dest: 'dev/', expand: true, flatten:true },
          { src: 'src/js/*', dest: 'dev/', expand: true, flatten:true }
        ]
      },
      dist: {
        files: [
          { src: ['src/media/*'], dest: 'dist/media/', expand: true, flatten:true },
          { src: ['bootstrap/dist/fonts/*'], dest: 'dist/fonts/', expand: true, flatten:true },
          { src: 'bootstrap/dist/js/*', dest: 'dev/', expand: true, flatten:true },
        ]
      }
    }
  });
 
  // Grunt init
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Grunt tasks
  grunt.registerTask('default', ['dev'])
  grunt.registerTask('dev', ['concat:dev', 'less:dev', 'copy:dev'])
  grunt.registerTask('dist', ['concat:dist', 'less:dist', 'uglify:dist', 'cssmin:dist', 'copy:dist'])
  
}
