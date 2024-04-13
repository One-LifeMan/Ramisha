import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import environments from "gulp-environments";
import changed from "gulp-changed"; // визначає чи змінилися файли в потоці
import plumber from "gulp-plumber"; // запобігайте розриву каналу через помилки плагінів gulp
import sassGlob from "gulp-sass-glob"; // плагін для gulp-sass для використання глобального імпорту
import { plumberNotify } from "./../gulp-plugins.js";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano"; // Minify CSS

import webpInCss from "webp-in-css/plugin.js";

const sass = gulpSass(dartSass);
const { development, production } = environments;

const SOURCE = ["./src/scss/**/*.{scss, css}"];
let destination = development() ? "dev/css" : "dist/css";

const postCssPluginsDev = [webpInCss({})];
const postCssPluginsProd = [autoprefixer(), webpInCss({}), cssnano()];

function css() {
    return gulp
        .src(SOURCE)
        .pipe(changed(destination))
        .pipe(plumber(plumberNotify("SCSS")))
        .pipe(development(sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass().on("error", sass.logError))
        .pipe(development(postcss(postCssPluginsDev)))
        .pipe(production(postcss(postCssPluginsProd)))
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest(destination));
}

export { css };
