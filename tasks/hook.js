'use strict';
var path = require('path');

module.exports = function(grunt) {
  var patterns = ['_Gruntfile.js', '**/_Gruntfile.js', '!node_modules/**'];
  if(grunt.config.data.hookPatterns) {
    patterns = grunt.config.data.hookPatterns;
  }

  /**
   * Hook tasks repository
   * @type {{tasks: Array, push: Function, get: Function, exec: Function}}
   */
  grunt.hook = {
    tasks: [],
    /**
     * Push new task
     * @param action
     * @param weight
     */
    push: function(action, weight) {
      if(weight===undefined) {
        weight=0;
      }
      this.tasks.push({ name: action, weight: weight});
    },

    /**
     * Get all tasks ordered by weight
     * @returns {Array}
     */
    get: function () {
      var tasks = this.tasks.sort(function(a,b) {
        if (a.weight < b.weight) {
          return -1;
        } if (a.weight > b.weight) {
          return 1;
        }
        return 0;
      });

      var queue = [];
      for(var i=0;i<tasks.length; i+=1) {
        queue.push(tasks[i].name);
      }
      return queue;
    },

    /**
     * Execute tasks
     */
    exec: function() {
      grunt.task.run(this.get());
    }
  };

  /**
   * Load all the hooked grunts
   *    (That's the magic part!)
   */
  grunt.verbose.subhead('Loading hooked grunts...');
  var cwd = process.cwd(); //save the current dir, we are going to manipulate it a little here...

  var src = grunt.file.expand(patterns);
  for(var i=0;i<src.length;i+=1) {
    var gruntfile = src[i];
    var msg = 'Loading "' + path.basename(path.dirname(gruntfile)) + '" task...';

    try {
      var fullPath = path.resolve(cwd, gruntfile);
      process.chdir(path.dirname(fullPath)); // Change the process dir for loading internal npms

      // Load taskfile.
      var fn = require(fullPath);
      if (typeof fn === 'function') {
        fn.call(grunt, grunt);
      }
      grunt.verbose.write(msg).ok();
    } catch(e) {
      // Something went wrong.
      grunt.log.write(msg).error().verbose.error(e.stack).or.error(e);
    }
  }
  process.chdir(cwd);// Go back to the original dir
  grunt.verbose.subhead('Loading hooked grunts completed.');

  // Exec tasks
  grunt.registerTask('hook', 'Run all the hooked tasks.', function() {
    grunt.log.ok('Starting hooked tasks.');
    grunt.hook.exec();
  });

};