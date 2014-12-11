'use strict';

module.exports = function(grunt) {
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
  grunt.mean.push('concat', 10);
};
