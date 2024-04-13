import gulp from "gulp";
import changed from "gulp-changed"; // запобігайте розриву каналу через помилки плагінів gulp
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import environments from "gulp-environments";

const convertTTFToWOFF = false;

const { development, production } = environments;


let destination = development() ? "dev/fonts" : "dist/fonts";

function fonts() {
    if(convertTTFToWOFF) {
        const SOURCE = ["./src/fonts/**/*.ttf"];

        return gulp
            .src(SOURCE)
            .pipe(changed(destination))
            .pipe(ttf2woff())
            .pipe(gulp.dest(destination))

            .pipe(gulp.src(SOURCE))
            .pipe(ttf2woff2())
            .pipe(gulp.dest(destination))

            .pipe(gulp.src("./src/fonts/**/*"))
            .pipe(gulp.dest(destination));



    } else {
        const SOURCE = ["./src/fonts/**/*"];

        return gulp
            .src(SOURCE)
            .pipe(changed(destination))
            .pipe(gulp.dest(destination));
    }
}

export { fonts };
