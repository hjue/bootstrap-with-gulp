var gulp = require('gulp')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css');
var addsrc = require('gulp-add-src');
var path = require('path')
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var del = require('del');

var src = path.resolve.bind(path, 'assets')
var dest = path.resolve.bind(path, 'public/static')

gulp.task('icons', function() { 
    return gulp.src('./node_modules/font-awesome/fonts/**.*') 
        .pipe(gulp.dest(dest('fonts'))); 
});


gulp.task('css', function () {
  return gulp.src('assets/css/app.less')
    .pipe(plumber())
    .pipe(less({compress: true}))
    .pipe(autoprefixer())
    .pipe(minifyCSS({keepSpecialComments:0}))
    .pipe(gulp.dest(dest('css')))
})


gulp.task('js', function() {

  gulp.src(['assets/js/app.js'])
    .pipe(browserify())
    // .pipe(addsrc(src('js/iscroll-probe.js')))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest('js')));
});

gulp.task('images', function() {

  del(dest('images/*'));

  return gulp.src(src('images/*'))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(dest('images')));
});

gulp.task('watch',['images','icons','css','js'],function () {
  gulp.watch([
    src('css/*.less'),
  ], ['css'])
  gulp.watch([
    src('images/*.png'),
  ], ['images'])

  gulp.watch([
    src('js/*.js')
  ], ['js'])
})

gulp.task('default',['images','icons','css','js']);