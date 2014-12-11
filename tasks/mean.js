'use strict';
var patterns = ['packages/**/meanGruntfile.js', '!packages/**/node_modules/**'];
var path = require('path');

module.exports = function(grunt) {
  /**
   * Mean tasks repository
   * @type {{tasks: Array, push: Function, get: Function, exec: Function}}
   */
  grunt.mean = {
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
     * Execute taks
     */
    exec: function() {
      grunt.task.run(this.get());
    }
  };

  /**
   * Load all the mean-packages grunts
   *    (That's the magic part!)
   */
  grunt.verbose.subhead('Loading mean-packages grunts...');
  var cwd = process.cwd(); //save the current dir, we are going to manipulate it a little here...

  var src = grunt.file.expand(patterns);
  for(var i=0;i<src.length;i+=1) {
    var gruntfile = src[i];
    var msg = 'Loading "' + path.basename(gruntfile) + '" task...';

    try {
      var fullPath = path.resolve(gruntfile);
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
  grunt.verbose.subhead('Loading mean-packages grunts completed.');

  // Exec tasks
  grunt.registerTask('mean', 'Run all the tasks which injected by mean-packages.', function() {
    grunt.log.ok('Starting mean tasks.');
    grunt.mean.exec();
  });

};