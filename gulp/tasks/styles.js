var config       = require('../config');
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var cssGlobbing  = require('gulp-css-globbing');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using the following plugins:

cssGlobbing: Allows globbing imports in .scss: @import 'styles/modules/*.scss';
sass: Sass compilation using super-fast libsass
autoprefixer: Automatically adds vendor prefixes to experimental properties
*/

module.exports = gulp.task('styles', function() {
  return gulp.src([
    config.paths.styleSrc + 'main.scss',
  ])
  .pipe(cssGlobbing({
    extensions: ['.scss']
  }))
  .pipe(sass({
    outputStyle: 'compressed',
    onError: console.error.bind(console, 'Sass error:')
  }))
  .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe(gulp.dest(config.paths.styleDist))
  .pipe(browserSync.reload({ stream: true }));
});