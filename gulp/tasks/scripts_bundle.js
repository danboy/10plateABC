var config       = require('../config');
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var browserify   = require('browserify');
var babelify     = require('babelify');
var debowerify   = require('debowerify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var _            = require('lodash');

//
//   Scripts : Bundle
//
//////////////////////////////////////////////////////////////////////

/*
Bundles javascript files. Add your files to the "files" array to create
separate bundles.
*/

gulp.task('scripts:bundle', ['scripts:lint'], function() {
  var files = [
    'main.js'
  ];

  return browserify({
    entries: _.map(files, function(file) {
      return config.paths.scriptSrc + file;
    }),
    debug: true,
  })
  .transform(babelify.configure({
    ignore: ['bower_components/**/*']
  }))
  .transform(debowerify)
  .plugin('factor-bundle', { outputs: _.map(files, function(file) {
    return config.paths.scriptDist + 'bundle.' + file;
  })})
  .bundle()
  .on('error', function(err) {
    console.log(err.toString());
    this.emit('end');
  })
  .pipe(source('bundle.common.js'))
  .pipe(buffer())
  .pipe(gulp.dest(config.paths.scriptDist))
  .pipe(browserSync.reload({ stream: true, once: true }));
});
