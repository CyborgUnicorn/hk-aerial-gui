var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  runSequence = require('run-sequence'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  templates = require('gulp-angular-templatecache'),
  minify = require('gulp-minify-html'),
  cheerio = require('gulp-cheerio'),
  concat = require('gulp-concat'),
  file = require('gulp-file');

gulp.task('generate', require('angular-generator').generate);

gulp.task('jshint', function () {
  return gulp.src(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('less', function () {
  return gulp.src(['./src/css/main.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public'));
});
gulp.task('templates', function () {
  return gulp.src(['./src/**/*.html'])
    .pipe(templates({module: 'hk-aerial-gui'}))
    .pipe(gulp.dest('./src'));
});
gulp.task('concat', function () {
  return gulp.src(['./bower_components/angular/angular.js','./src/setup/module.js', './src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public'));
});
gulp.task('html', function () {
  return gulp.src(['./src/index.html'])
    .pipe(cheerio(function ($) {
      $('script[data-build="exclude"]').remove();
      $('script').remove();

      $('head').children().append('<link rel="stylesheet" href="main.css" />');
      $('body').children().append('<script src="app.js"></script>');
      $('body').children().append('<script src="http://localhost:9001/socket.io/socket.io.js"></script>');

      var minifyOptions = {
        removeComments: true,
        collapseWhitespace: true
      };

      return file('index.html', $.html())
        .pipe(minify(minifyOptions))
        .pipe(gulp.dest('public'));
    }));
});

gulp.task('build', function (cb) {
  runSequence('less', 'templates', 'concat', 'html', function () { cb(); });
});

gulp.task('watch', function () {
  gulp.watch(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'], ['jshint']);
  gulp.watch(['src/**/*.js'], ['concat']);
  gulp.watch(['src/**/*.less'], ['less']);
  gulp.watch(['src/**/*.html', '!src/index.html'], ['templates']);
  gulp.watch(['src/index.html'], ['html']);
});

gulp.task('default', ['jshint', 'build', 'watch']);