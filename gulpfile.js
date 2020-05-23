let gulp = require('gulp');
let sass = require("gulp-sass");
let livereload = require('gulp-livereload');
let uglifyes = require('uglify-es');
let imagemin  = require('gulp-imagemin');
let composer = require('gulp-uglify/composer');
let uglify = composer(uglifyes, console);


// a task to generate the css with sass
gulp.task('sass', () => {
    return gulp.src('./src/scss/main.scss')
      .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
      .pipe(gulp.dest('./generated/css'));
  });

// A task to minify / uglify the javascript
gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./generated/js'))
});

gulp.task('images', function () {
  return gulp.src('.src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./generated/images'))
});


/* Live */ 
gulp.task('live', function() {
  livereload.listen();
  gulp.watch('./src/scss/**.scss', gulp.series('sass'));
  gulp.watch('./src/js/*.js', gulp.series('js'));
  gulp.watch('./src/images/*', gulp.series('images'));
});

// A master task
gulp.task('generate', gulp.series('sass', 'js', 'images'))
