# grunt-hook

> Allows hooking tasks to grunt from other files.

## Getting Started
This plugin requires Grunt `~0.4.5`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hook --save
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hook');
```

## The "hook" task

### Overview
In your project's Gruntfile, add a task named `hook` as "placeholder" to run all the injected tasks. This task will run all the tasks you injected.

#### Example
```js
module.exports = function(grunt) {
  grunt.registerTask('default', ['jshint', 'hook']);
};
```

### Usage

#### Injection Grunt tasks

1. Create `_Gruntfile.js` on your package.
1. Export `function` with arguments of `function(grunt)`
1. Extend the config with the function **`grunt.config.extend()`**
1. Add your task to the task list by using **`grunt.hook.push(task[, weight]);`**
    1. **task** - name of the task
    1. **weight** - weight to load the task [default: 0] *(lower is earlier)*

* If you loading a new grunt-plugin, you should add the npm-dependencies to directory of the `_Gruntfile.js`
* You can extend the `watch` task in order to add watch tasks...

#### Example
```js
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
  grunt.hook.push('concat', 10);
};
```

### Changing the patterns of the files
You can change the patterns of the files by adding `hookPatterns` to your config.

#### Example
```js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    hookPatterns: ['_Gruntfile.js', '**/_Gruntfile.js', '!node_modules/**']
  });
};
```

#### Projects that uses `grunt-hook`
You can learn from use-cases of projects that uses `grunt-hook`:

1. **[Mean.io](http://www.mean.io)** - Mean.io used `grunt-hook` to allow creating new tasks to the general flow of the framework by 3rd-party packages(like `mean-compass`).
2. **[Mean-Compass](https://www.github.com/AlmogBaku/mean-compass)** - Mean-compass is example for hook-package that implement the `grunt-hook` plugin.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(0.3.0) Renaming the package_
_(0.2.0) loading outside the task_
_(0.1.0) initial release_
