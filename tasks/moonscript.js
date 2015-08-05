/*
 * grunt-moonscript
 * https://github.com/neutra/grunt-moonscript
 *
 * Copyright (c) 2015 Neutra
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('moonscript', 'compile moonscript to lua', function(){
    var data = this.data;
    var files = grunt.file.expand({ cwd: data.files.cwd }, data.files.src);
    grunt.util.spawn({
      cmd: 'moonc',
      args: ['-t', data.files.dest].concat(files),
      opts: { cwd: data.files.cwd }
    }, this.async());
};