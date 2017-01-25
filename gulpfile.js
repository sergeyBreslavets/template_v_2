'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    // rigger        = require('gulp-rigger'),  //
    cssmin = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    notify = require("gulp-notify"),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    spritesmith = require('gulp.spritesmith'),
    reload = browserSync.reload;



var path = {
    build: {
        html: 'www/',
        js: 'www/assets/js/',
        css: 'www/assets/css/',
        images: 'www/assets/images/',
        fonts: 'www/assets/fonts/',
        fontBs: 'www/assets/fonts/bootstrap/',
        sprite: 'www/assets/images/sprite/',
        spriteScss: 'src/style/'
    },
    src: {
        html: 'src/html/*.html',
        js: [
            // 'bower_components/modernizr/modernizr.js',
            'src/js/modernizr.js',
            'bower_components/jquery/dist/jquery.js',


            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
            'bower_components/wow/dist/wow.min.js',
            'src/js/main.js',

        ],
        style: 'src/style/styles.scss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        fontsBs: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*',
        fontsAwesome: 'bower_components/components-font-awesome/fonts/*.*',
        sprite: 'src/sprite/*.*'
    },
    watch: {
        html: 'src/html/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        sprite: 'src/sprite/*.*'
    },
    clean: './www/assets'
};

var config = {
    server: {
        baseDir: "./www"
    },
    tunnel: true,
    host: 'templ',
    port: 8080,
    logPrefix: "Frontend"
};

// tasks 

gulp.task('sprites', function() {
    var spriteData =
        gulp.src(path.src.sprite)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
        }))

    spriteData.css.pipe(gulp.dest(path.build.spriteScss))
    spriteData.img.pipe(gulp.dest(path.build.sprite))
        .pipe(notify({
            title: 'sprite',
            message: 'sprite Complide'

        }));
});



// task html
gulp.task('html:build', function() {
    gulp.src(path.src.html)
        // .pipe(rigger()) // i am rigger off
        .pipe(gulp.dest(path.build.html))
        .pipe(notify({
            title: 'html',
            message: 'html build Complide'

        }))
        .pipe(reload({ stream: true }));

});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(concat('main.js'))
        .pipe(stripDebug())
        //        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(notify({
            title: 'js',
            message: 'js build Complide'

        }))
        .pipe(reload({ stream: true }));
});

gulp.task('style:build', function() {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(notify({
            title: 'sass',
            message: 'sass build Complide'

        }))
        .pipe(reload({ stream: true }));
});

gulp.task('image:build', function() {
    gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.images))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(notify({
            title: 'fonts',
            message: 'fonts copy Complide'

        }));
});

gulp.task('fontsbs:build', function() {
    gulp.src([path.src.fontsBs, path.src.fontsAwesome])
        .pipe(gulp.dest(path.build.fontBs))
        .pipe(notify({
            title: 'fonts bs',
            message: 'fonts bs copy Complide'

        }));
});





gulp.task('build', [
    'sprites',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'fontsbs:build',
    'image:build'
]);


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.sprite], function(event, cb) {
        gulp.start('sprites');
    });
});

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', [
    'build',
    'webserver',
    'watch'
]);