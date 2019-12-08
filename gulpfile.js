var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    cssnano = require ('gulp-cssnano');
    
var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
   })
};

gulp.task('sass', function() {
   gulp.src('./sass/*.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(cssnano())
      .pipe(rename({ extname: '.min.css'}))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./build/css'))
   });

gulp.task('scripts', function(){
    gulp.src('./js/**/*.js')
      .pipe(gulp.dest('./build/js'))
      .pipe(rename({ extname: '.min.js'}))
      
});

gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch('sass/*.scss', gulp.series('sass'));
   gulp.watch('js/**/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));