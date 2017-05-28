'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('workflow', function () {
   return gulp.src('./src/scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cssnano({
         zindex: false
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(rename(function (path) {
         if (path.extname === '.css') {
            path.basename += '.min';
         }
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream())
});

gulp.task('images', function () {
   return gulp.src('./src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'))
});

gulp.task('copyhtml', function () {
   return gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream())
});

gulp.task('copyjs', function () {
   return gulp.src('./src/js/**/*.js')
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream())
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('default', ['browserSync', 'workflow', 'copyhtml', 'copyjs'], function () {
   gulp.watch('./src/scss/**/*.scss', ['workflow']);
   gulp.watch('./src/*.html', ['copyhtml']);
   gulp.watch('./src/js/**/*.js', ['copyjs']);
   gulp.watch('./src/images/*', ['images'])
});
