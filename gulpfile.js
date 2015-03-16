var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mochaPhantomJS = require('gulp-mocha-phantomjs'),
  runSequence = require('run-sequence'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  templates = require('gulp-angular-templatecache'),
  minify = require('gulp-minify-html'),
  cheerio = require('gulp-cheerio'),
  concat = require('gulp-concat'),
  file = require('gulp-file'),
  livereload = require('gulp-livereload');

var running = {};

gulp.task('generate', require('angular-generator').generate);

gulp.task('jshint', function () {
  running.jshint = true;

  return gulp.src(['gulpfile.js', 'src/**/*.js', 'test/**/*.js', '!src/templates.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  running.test = true;

  return gulp.src(['test/**/*.html'])
    .pipe(mochaPhantomJS({reporter: 'nyan'}));
});

gulp.task('less', function () {
  return gulp.src(['src/css/main.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public'));
});
gulp.task('templates', function () {
  return gulp.src(['src/**/*.html', '!src/index.html'])
    .pipe(templates({module: 'hk-aerial-gui'}))
    .pipe(gulp.dest('./src'));
});
gulp.task('concat', function () {
  return gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/eventemitter2/lib/eventemitter2.js',
      'src/setup/module.js',
      'src/**/*.js'
    ])
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
      $('body').children().append('<script src="http://localhost:35729/livereload.js"></script>');
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
  running.build = true;

  runSequence('less', 'templates', 'concat', 'html', function () { cb(); });
});

gulp.task('watch', function () {
  if(running.jshint) {
    gulp.watch(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'], ['jshint']);
  }
  if(running.test) {
    gulp.watch(['src/**/*.js', 'test/**/*.html', 'test/**/*.js'], ['test']);
  }
  if(running.build) {
    gulp.watch(['src/**/*.js'], ['concat']);
    gulp.watch(['src/**/*.less'], ['less']);
    gulp.watch(['src/**/*.html', '!src/index.html'], ['templates']);
    gulp.watch(['src/index.html'], ['html']);

    livereload.listen();
    gulp.watch(['public/**/*']).on('change', livereload.changed);
  }
});

gulp.task('default', ['jshint', 'build', 'watch']);