const gulp = require('gulp');
const mocha = require('gulp-mocha');
var gutil = require('gulp-util');
const paths = require('../paths');
const runSequence = require('run-sequence');
gulp.task('tdd', function (callback) {
   return runSequence(
       'watch-changes',
       'run-tests',
       callback)
});

gulp.task('watch-changes', function () {
    gulp.watch([paths.source, paths.testSrc], ['run-tests']);
});


gulp.task('mocha', function () {
    return gulp.src(paths.testOutput + 'tests/' + '**/*.js', {read: false})
         .pipe(mocha({ reporter: 'list' }))
         .on('error', gutil.log);
});

gulp.task('run-tests', function () {
   return runSequence(
       'build-tests',
       'mocha'
   );
});