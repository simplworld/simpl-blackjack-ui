var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

/* Webpack */
gulp.task('webpack', function() {
  return gulp
    .src('js/*.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('staticfiles/webpack_bundles/'));
})

gulp.task('build', gulp.parallel('webpack'));

/* Watch Files For Changes */
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', gulp.series('webpack'));
})

gulp.task('default', gulp.series('build', 'watch'));

