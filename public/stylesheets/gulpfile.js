const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const cleancss     = require('gulp-clean-css');

gulp.task('sass', () =>
    gulp.src('./scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            sourceComments: false
        }))
        .pipe(cleancss({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
); 

gulp.task('default', () => {
    gulp.watch('./scss/*.scss', ['sass']);
});