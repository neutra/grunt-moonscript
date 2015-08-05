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
  var async = this.async();
    this.data.files.forEach(function(f){
      var files = grunt.file.expand({ cwd: f.cwd }, f.src);
      grunt.util.spawn({
        cmd: 'moonc',
        args: ['-t', f.dest].concat(files),
        opts: { cwd: f.cwd }
      }, async);
    });
  });
}