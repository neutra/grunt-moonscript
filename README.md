# grunt-moonscript

> Compile Moonscript to Lua using `moonc` and the Grunt pipeline.

## Getting Started
This plugin requires [Moonscript](http://moonscript.org/) version `^0.4.0` and `moonc` to be found in your PATH. If you don't have Moonscript installed on your computer, please visit [its homepage](http://moonscript.org/) for instructions on how to install Moonscript.

This plugin requires Grunt `^0.4.5`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-moonscript --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-moonscript');
```

## The "moonscript" task

### Overview
In your project's Gruntfile, add a section named `moonscript` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    moonscript: {
        options: {
            lint: false
        },
        build: {
            src: ['**/*.moon']
        }
    }
});
```

### Options

#### options.lint
Type: `boolean`
Default value: `false`

Use Moonscript's linter on the file(s) specified.

### Usage Examples

#### Default Options
In this example, the default options are used to compile `.moon` files in a project into `.lua` files, in the same directories as the original `.moon` files.

```js
grunt.initConfig({
    moonscript: {
        build: {
            src: ['**/*.moon']
        }
    }
});
```

You can also specify a folder for `src`:

```js
grunt.initConfig({
    moonscript: {
        build: {
            src: ['moon_folder']
        }
    }
});
```

The following example puts the compiled files into the folder specified by `dest`.

```js
grunt.initConfig({
    moonscript: {
        build: {
            files: {
                'out_folder': ['file_1.moon', 'file_2.moon']
            }
        }
    }
});
```

#### Custom Options
If you'd like to lint the `.moon` files instead of compiling them, add the `lint` option.

```js
grunt.initConfig({
    moonscript: {
        options: {
            lint: true
        },
        src: ['file_1.moon']
    }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**1.1.0** - 2016-9-3 - Updated the version of Grunt required, did error-checking of inputs, outputted Moonscript's messages to the console, added `options.lint`, updated README.md

**1.0.2** - 2015-8-5 - (author: Neutra) Changed the way files are processed, bug fixes

**1.0.1** - 2015-8-5 - (author: Neutra) Javascript bug

**1.0.0** - 2015-8-5 - (author: Neutra) First release