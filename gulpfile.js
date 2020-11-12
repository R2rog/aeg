const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const concat = require("gulp-concat");
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const {src,series,parallel,dest,watch} = require('gulp');

const cssPath = "src/public/css/*.css";
const htmlPath = "src/public/*.html";
const imgPath = "src/public/images/*";
const jsPath = "src/public/js/*.js"

//Copying html 
function copyHTML(){
    return src(htmlPath).pipe(gulp.dest("src/dist"));
}

//Copying

//Image minifier
function imgMin(){
    return src(imgPath).pipe(imagemin()).pipe(gulp.dest('src/dist/images'));
}

//Javascript minifier
function jsMin(){
    return src('src/js/main.js', { allowEmpty: true }) 
    .pipe(minify({noSource: true,
        exclude: ['tasks'],
        ignoreFiles: ['-min.js'],
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(dest('src/dist/js'));
}

//CSS minifier
function cssMin(){
    return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("src/dist/css"));
}
//Exports functions
exports.imgMin = imgMin;
exports.copyHTML = copyHTML;
exports.cssMin = cssMin;
exports.jsMin = jsMin;
//Default run command
exports.default = parallel(copyHTML,imgMin,cssMin,jsMin);