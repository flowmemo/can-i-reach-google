'use strict'

var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var inlinesource = require('gulp-inline-source')

gulp.task('inline', function () {
  return gulp.src('./src/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'))
})

gulp.task('minify-html', ['inline'], function () {
  return gulp.src('./dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['inline', 'minify-html'], function () {
  return gulp.src('./dist/index.html')
    .pipe(gulp.dest('./'))
})

// To use this task you should install browerSync manually: npm install browser-sync
gulp.task('serve', ['build'], function () {
  var browserSync = require('browser-sync').create()

  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch('./src/**/*', ['build'])
  gulp.watch('./*.html').on('change', browserSync.reload)
})
