'use strict';

module.exports = function(grunt, mean) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.config.merge({
    concat: {
      dist: {
        src: ['*.js'],
        dest: 'test-concat.js'
      }
    }
  });

  //Inject the task to the task list
  mean.push('concat', 10);
};
