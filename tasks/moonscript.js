/*
 * grunt-moonscript
 * https://github.com/goofanader/grunt-moonscript
 *
 * Copyright (c) 2016 goofanader, Neutra
 * Licensed under the MIT license.
 */

'use strict';

function doesExist(obj) {
    return typeof obj !== "undefined" && obj !== null;
}

module.exports = function(grunt) {
    grunt.registerMultiTask('moonscript', 'Compile Moonscript to Lua using moonc and the Grunt pipeline.', function() {
        // make task async so it can get the stdout of moonc.
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            lint: false
        });

        var taskName = this.name + ":" + this.target;

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // error check first
            if (f.src.length === 0) {
                // make sure that src files were given
                grunt.fail.warn("No valid files given as src.");
            } else if (doesExist(f.dest) && typeof f.dest !== "string") {
                // can only have one destination folder per src group
                grunt.fail.warn("Cannot have more than one destination per src list.");
            } else {
                var src = f.src.filter(function(filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                });

                if (src.length > 0) {
                    var args = src;

                    if (options.lint) {
                        args = ["-l"].concat(args);
                    }

                    if (doesExist(f.dest)) {
                        // we already checked if it was provided and there's too many destinations given, so check if the folder is a valid filepath
                        if (grunt.file.isDir(f.dest) && !grunt.file.exists(f.dest)) {
                            grunt.fail.warn("Dest must go to a valid path.");
                            return false;
                        } else if (options.lint) {
                            grunt.fail.warn("Cannot lint the Moonscript files and have a destination at the same time!");
                            return false;
                        } else {
                            // it's good to go! add to the argument list.
                            if (grunt.file.isDir(f.dest)) {
                                args = ["-t", f.dest].concat(args);
                            } else {
                                // check to make sure that there's only one file in src before printing to that file
                                if (src.length === 1 && !grunt.file.isDir(src[0])) {
                                    args = ["-o", f.dest].concat(args);
                                } else {
                                    grunt.fail.warn("Cannot use multiple files if outputting to a file!");
                                    return false;
                                }
                            }
                        }
                    }

                    // run moonc
                    grunt.util.spawn({
                        cmd: 'moonc',
                        grunt: false,
                        args: args
                    }, function(error, result, code) {
                        if (code !== 0) {
                            grunt.fail.warn(result.stderr);
                        } else {
                            if (options.lint && result.stderr.length === 0) {
                                // lint was successful
                                grunt.log.writeln("Lint successful. No problems found.");
                            } else {
                                grunt.log.writeln(result.stderr);

                                if (options.lint) {
                                    grunt.fail.warn("");
                                }
                            }
                        }

                        done(code);
                    });
                } else {
                    grunt.fail.warn("No valid files given as src.");
                }
            }
        });
    });
};