var gulp = require('gulp')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var browserify = require('gulp-browserify'); 
var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css');


gulp.task('icons', function() { 
    return gulp.src('./node_modules/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./public/static/fonts')); 
});


gulp.task('css', function () {
  return gulp.src('assets/css/app.less')
    .pipe(plumber())
    .pipe(less({compress: true}))
    .pipe(autoprefixer())
    .pipe(minifyCSS({keepSpecialComments:0}))
    .pipe(gulp.dest('public/static/css'))
})


gulp.task('js', function() {

  gulp.src(['assets/js/app.js'])
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('public/static/js'));
});


gulp.task('watch',['icons','css','js'],function () {
  gulp.watch([
    'assets/css/*.less',
  ], ['css'])

  gulp.watch([
    'assets/js/*.js',
  ], ['js'])  
})

gulp.task('default',['watch']);