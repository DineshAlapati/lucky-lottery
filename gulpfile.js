var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('lint', function () {
  return gulp
    .src(['gulpfile.js', 'bin/*.js', 'lib/*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
  return gulp
    .src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .once('error', function (err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function () {
      setTimeout(function () {
        process.exit();
      }, 1000);
    });
});

gulp.task('default', ['lint', 'test'], function () {
  gulp.watch(['*.js', 'src/*.js', 'test/*.js'], function () {
    gulp.run('lint', 'test');
  });
});