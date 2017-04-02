const gulp = require('gulp');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCss = require('gulp-clean-css');
const uglifyjs = require('gulp-uglifyjs');
const wrapPipe = require('./lib/gulpError');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

var paths = {
    pug: [
        'app/src/pug/**/*.pug'
    ],
    less: [
        'public/src/*less'
    ],
    js: [
        'public/js/bundle.js'
    ]
}

gulp.task('pug', wrapPipe(function(success, error) {
    return gulp.src(paths.pug)
        .pipe(pug({
            pretty: true
        }).on('error', error))
        .pipe(rename({
            extname: '.component.html'
        }))
        .pipe(gulp.dest('app/dist/html'))
}));

gulp.task('less', wrapPipe(function(success, error) {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less().on('error', error))
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('public/css'))
}));

gulp.task('uglify',wrapPipe(function(success, error) {
    return gulp.src(paths.js)
        .pipe(uglifyjs('bundle.js', {
            outSourceMap: false
        }))
        .pipe(gulp.dest('public/js'));
}));

gulp.task('concat', wrapPipe(function(success, error) {
    return gulp.src('assets/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public/css'))
}));

gulp.task('default', function() {
    gulp.watch(paths.pug, ['pug']);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.js, ['uglify']);
});