var gulp       = require('gulp');
var browserify = require('browserify');
var del        = require('del');
var source     = require('vinyl-source-stream');
var sass       = require('gulp-sass');
var _          = require('lodash');
var sequence   = require('run-sequence');
var babelify   = require('babelify');

var examples = ['dropdown-menu', 'icon-button', 'dialog'];

gulp.task('clean', function(done){
  del('./build/*', done);
});

gulp.task('sass', function(){
  gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/'));
});

gulp.task('browserify', function(){
  browserify(['./src/'+global.example+'/index.jsx'])
    .transform(babelify.configure({stage: 1}))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'+global.example+'/'));
});

gulp.task('copy', function(){
  gulp.src(['./src/**/index.html'])
    .pipe(gulp.dest('./build/'));
});

global.exampleTask = [];
_.forEach(examples, function(example){
  (function(example){
    gulp.task('init:'+example, function(){
      global.example = example;
    });
    gulp.task('browserify:'+example, function(cb){
      sequence('init:'+example, 'browserify', cb);
    });
  })(example);
  global.exampleTask.push('browserify:'+example);
});

gulp.task('examples:browserify', function(){
  sequence.apply(null, global.exampleTask);
});


gulp.task('default', ['sass', 'copy', 'examples:browserify']);

















