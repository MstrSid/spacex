/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "docs"
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src('src/scss/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(gulp.dest("src/css"))

        //for draft
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('src/icons/**/*').on('change', browserSync.reload);
    gulp.watch('src/img/**/*').on('change', browserSync.reload);
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('docs/'));
});

gulp.task('scripts', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('docs/js'));
});

gulp.task('icons', function(){
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('docs/icons'));
});

gulp.task('video', function(){
    return gulp.src('src/video/**/*')
        .pipe(gulp.dest('docs/video'));
});

gulp.task('css', function(){
    return gulp.src('src/css/**/*')
        .pipe(gulp.dest('docs/css'));
});

gulp.task('images', function(){
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'icons', 'images', 'video', 'css'));