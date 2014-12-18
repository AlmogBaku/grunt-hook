/*
 * grunt-hook
 * https://github.com/AlmogBaku/grunt-hook
 *
 * Copyright (c) 2014 AlmogBaku
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    hookPatterns: ['_Gruntfile.js', '**/_Gruntfile.js', '!node_modules/**'],
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hook']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
