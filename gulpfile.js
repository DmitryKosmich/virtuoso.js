// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var shell = require('gulp-shell');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// JSDoc documentation
gulp.task('doc', shell.task([
    'jsdoc .'
]));

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['lint', 'scripts', 'doc']);
});

// Test task
gulp.task('test', function () {
    return gulp.src('test/**/*.js')
        .pipe(jasmine());
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'test', 'watch']);
