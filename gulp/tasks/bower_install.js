var gulp         = require('gulp');
var shell        = require('gulp-shell');

//
//   Bower Install
//
//////////////////////////////////////////////////////////////////////

/*
Make sure all Bower dependencies are installed
*/

module.exports = gulp.task('bowerInstall', shell.task([
  'bower install'
]));