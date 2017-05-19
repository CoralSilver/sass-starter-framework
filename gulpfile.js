'use strict';

var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');

// Sass compile and auto-prefix task
gulp.task('sass', function () {
   gulp.src('sass/**/*.scss')
    // Initialize sourcemaps
    .pipe(sourcemaps.init())
      .pipe(sass({
      style: 'expanded',
      errLogToConsole: true
      }))
     // Pass the compiled sass through the prefixer
     .pipe(prefix(
         'last 2 version'
     ))
     // Write sourcemaps to a separate file
     .pipe(sourcemaps.write('.'))
     .pipe(notify({
        message: 'Styles task complete'
    }))
     // Finally put the compiled sass into a css file
    .pipe(gulp.dest('css'))
});

gulp.task('lint-sass', function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      },
      files: {ignore: '**/*.scss'},
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0
      },
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// Creating a default task
gulp.task('default', ['sass','lint-sass']);
