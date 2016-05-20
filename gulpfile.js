'use strict'
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin');
var inlinesource = require('gulp-inline-source')

gulp.task('inline', function () {
  return gulp.src('./src/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'))
})

gulp.task('minify-html', ['inline'], function () {
  return gulp.src('dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['inline', 'minify-html'])
