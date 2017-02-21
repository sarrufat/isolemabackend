const gulp = require('gulp');
const paths = require('../paths');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const runSequence = require('run-sequence');

var typescriptCompiler = typescriptCompiler || null;
var testTypescriptCompiler = testTypescriptCompiler || null;
var srcTestTypescriptCompiler = srcTestTypescriptCompiler || null;

gulp.task('build-typescript', function() {
    if(!typescriptCompiler) {
        typescriptCompiler = typescript.createProject('tsconfig.json', {
            "typescript": require('typescript')
        });
    }
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(typescript(typescriptCompiler))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
        .pipe(gulp.dest(paths.output));
});

gulp.task('clean', function() {
    return gulp.src([paths.output])
        .pipe(vinylPaths(del));
});

gulp.task('build-json',function () {
    return gulp.src(paths.jsonSource)
        .pipe(gulp.dest(paths.output));
});

gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        'build-typescript',
        'build-json',
        callback
    );
});

gulp.task('clean-tests', function () {
    return gulp.src(paths.testOutput)
        .pipe(vinylPaths(del));
});

gulp.task('build-json-test',function () {
    return gulp.src(paths.jsonSource)
        .pipe(gulp.dest(paths.testOutput + '/src'));
});

gulp.task('build-typescript-test-code-tests', function () {
    if(!testTypescriptCompiler) {
        testTypescriptCompiler = typescript.createProject('tsconfig.json', {
            "typescript": require('typescript'),
            "rootDir": "",
            "baseUrl": ".",
            "paths":{
                "unit-module": ["src/application/entities/unit-module.d.ts"],
                "core-specification": ["src/specification/specification.d.ts"]
            }
        });
    }
    return gulp.src(paths.dtsSrc.concat(paths.testSrc))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(typescript(testTypescriptCompiler))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/test'}))
        .pipe(gulp.dest(paths.testOutput + '/test'));
});

gulp.task('build-typescript-src-code-tests', function () {
    if(!srcTestTypescriptCompiler) {
        srcTestTypescriptCompiler = typescript.createProject('tsconfig.json', {
            "typescript": require('typescript'),
        });
    }
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(typescript(srcTestTypescriptCompiler))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
        .pipe(gulp.dest(paths.testOutput + '/src'));
});


gulp.task('build-tests', function (callback) {
    return runSequence(
        'clean-tests',
        'build-typescript-test-code-tests',
        'build-typescript-src-code-tests',
        'build-json-test',
        callback
    );
})
