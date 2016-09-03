/*
 * grunt-moonscript
 * https://github.com/goofanader/grunt-moonscript
 *
 * Copyright (c) 2016 goofanader, Neutra
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    moonscript: {
      bad_file_test: {
          src: ['test/null.moon']
      },
      one_file_test: {
        src: 'test/1.moon'
      },
      multiple_files_test: {
        src: ['test/1.moon', 'test/2.moon']
      },
      directory_in_test: {
          src: ['test']
      },
      directory_out_test: {
        files: {
          'tmp/directory_out_test': ['test/1.moon']
        }
      },
      directories_test: {
          files: {
              'tmp/directories_test': ['test']
          }
      },
      linter_test: {
          options: {
              lint: true
          },
          src: ['test']
      },
      outfile_test: {
          files: {
              "tmp/out.lua": ['test']
          }
      },
      old_version_test: {
          files: [{
            expand: true,
            cwd: "",
            src: "test/*.moon",
            dest: ".",
            ext: ".lua"
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'moonscript', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
