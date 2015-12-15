var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var clean = require('gulp-clean');

var options = {}
options.scss = {
    src: 'src/scss/**/*.scss',
    dest: 'static/stylesheets'
}

options.js = {
    dist: {
        src: 'src/javascripts/**/*.js',
        dest: 'static/javascripts/dist'
    },
    uglified: {
        src: ['static/javascripts/dist/notesea.js',
                'static/javascripts/dist/notesea.config.js',
                'static/javascripts/dist/notesea.routes.js',
                'static/javascripts/dist/utils/**/*.js',
                'static/javascripts/dist/layout/**/*.js',
                'static/javascripts/dist/authentication/**/*.js',
                'static/javascripts/dist/notes/**/*.js'],
        dest: 'static/javascripts/build'
    },
    preCopy: {
        src: 'src/javascripts/**/*.js',
        dest: 'static/javascripts/prengapp'
    }
}
gulp.task('js:uglify', function() {
    return gulp.src(options.js.dist.src)
                 .pipe(ngAnnotate())
                 .pipe(uglify())
                 .pipe(gulp.dest(options.js.dist.dest));
});

gulp.task('js:uglify-concat', function() {
    return gulp.src(options.js.uglified.src)
                 .pipe(concat('app.js'))
                 .pipe(gulp.dest(options.js.uglified.dest));
});

gulp.task('js:copy', function() {
    return gulp.src(options.js.preCopy.src)
                 .pipe(gulp.dest(options.js.preCopy.dest));
});


gulp.task('js:dist:clean', function() {
    return gulp.src(options.js.dist.dest)
                .pipe(clean());
});


gulp.task('js:predist:clean', function( ){
    return gulp.src(options.js.preCopy.dest)
                .pipe(clean());
});

gulp.task('js:uglified:clean', function() {
    return gulp.src(options.js.uglified.dest)
                .pipe(clean());
});

gulp.task('js:clean', ['js:dist:clean', 'js:predist:clean', 'js:uglified:clean']);

gulp.task('sass:build', function() {
    gulp.src(options.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(options.scss.dest));
});

gulp.task('css:clean', function() {
    return gulp.src(options.scss.dest)
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(options.scss.src, ['sass:build']);
    gulp.watch(options.js.preCopy.src, ['js:copy']);
});