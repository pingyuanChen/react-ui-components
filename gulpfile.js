var gulp = require('gulp');
var config = {
  copy: {
    src: './src/sass/**',
    dest: './lib/sass/'
  }
};

gulp.task('copy', function(){
  gulp.src(config.copy.src, {buffer: false})
    .pipe(gulp.dest(config.copy.dest));
});