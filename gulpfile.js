/**
 * Created by Administrator on 2018/1/2.
 */
const gulp = require('gulp');
// 转译js
gulp.task('webpack',() => {
    const webpack = require('webpack-stream');
    const config = require('./webpack.config.js');
    gulp.src('./src/js/**/*.ts')
        .pipe(webpack(config, require('webpack')))
        .pipe(gulp.dest('./www/js'));
});

//编译less
gulp.task('less',() => {
    const less = require('gulp-less');
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./www/css'));
});

gulp.task('default', ['webpack','less']);

gulp.task('watch',() => {
    gulp.watch('./src/less/*.less', ['less']);
    gulp.watch('./src/js/**/*.js', ['webpack']);
})