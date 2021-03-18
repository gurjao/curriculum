var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var minifycss = require('gulp-minify-css');
//var gulp = require( './node_modules/gulp/index.js' );

/* Minifica */
gulp.task('default', async function() {
    gulp.src('./css/**/*.scss').pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).pipe(gulp.dest('./public/css'));
    gulp.src('./js/**/*.js').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./public/css'));
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css.map').pipe(gulp.dest('./public/css'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js.map').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/jquery/dist/jquery.min.map').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/popper.js/dist/umd/popper.min.js').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/popper.js/dist/umd/popper.min.js.map').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/@fortawesome/fontawesome-free/css/all.min.css').pipe(gulp.dest('./public/css'));
    gulp.src('./node_modules/@fortawesome/fontawesome-free/js/all.min.js').pipe(gulp.dest('./public/js'));
    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*').pipe(gulp.dest('./public/webfonts'));
    gulp.src('./node_modules/font-awesome/fonts/*').pipe(gulp.dest('./public/fonts'));
});
gulp.task('watch', function() {
    gulp.watch('./js/**/*.js', gulp.series('default'));
});

/*
gulp.task('mensagem', function (done){
    console.log('Teste de retorno!');
    return done();
});

gulp.task('messagem', function() { 
    return new Promise(function(resolve, reject) {
        console.log("Teste de retorno");
        resolve();
    });
});
*/

