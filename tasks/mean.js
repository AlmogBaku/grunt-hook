'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('mean', 'Load mean-packages grunt extensions.', function() {
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var filesMap = {};

      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else if(path.basename(filepath)[0] === '_') { //do not include no-compile;
          return false;
        } else {
          return true;
        }
      });

      var meanTasks = {
        tasks: [],
        push: function(action, weight) {
          if(weight===undefined) {
            weight=0;
          }
          this.tasks.push({ name: action, weight: weight});
        },
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
        exec: function() {
          grunt.task.run(this.get());
        }
      };

      //save the current dir, we are going to manipulate it a little here...
      var cwd = process.cwd();

      for(var i=0;i<src.length;i+=1) {
        var gruntfile = src[i];
        var msg = 'Loading "' + path.basename(gruntfile) + '" task...';

        try {
          var fullPath = path.resolve(gruntfile);
          process.chdir(path.dirname(fullPath)); // Change the process dir for loading internal npms

          // Load taskfile.
          var fn = require(fullPath);
          if (typeof fn === 'function') {
            fn.call(grunt, grunt, meanTasks);
          }
          grunt.verbose.write(msg).ok();
        } catch(e) {
          // Something went wrong.
          grunt.log.write(msg).error().verbose.error(e.stack).or.error(e);
        }
        if(i===(src.length-1)) {
          process.chdir(cwd); // Go back to the original dir
          meanTasks.exec();
        }
      }
    });
  });

};
