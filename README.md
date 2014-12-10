# grunt-mean

> Load mean-packages grunt extensions.

## Getting Started
This plugin requires Grunt `~0.4.5`, and using [Mean.io](http://www.mean.io)

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mean');
```

## The "mean" task

### Overview
In your project's Gruntfile, add a section named `mean` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    mean: {
      main: ['packages/**/meanGruntfile.js', '!packages/**/node_modules/**']
    },
});
```

### Usage

#### Injection Grunt to your mean-package

1. Create `meanGruntfile.js` on your package.
1. Export `function` with arguments of `function(grunt, mean)`
1. Extend the config with the function **`grunt.config.extend()`**
1. Add your task to the task list by using **`mean.push(task[, weight]);`**
    1. **task** - name of the task
    1. **weight** - weight to load the task [default: 0] *(lower is earlier)*

* You can add npm-dependencies to your mean-package in order to add new functionality
* You can extend the `watch` task in order to add watch tasks...

#### Example
```js
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
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(0.1.0) initial release_
