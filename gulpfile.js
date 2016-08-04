var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "."
		}
	});
});

gulp.task('watch', ['transform', 'browser-sync'], function() {
	gulp.watch(['./src/*.html'], ['transform']);
});

gulp.task('transform', function() {
	gulp.src(['./src/*.html'])
		.pipe(inlineCss({
			removeHtmlSelectors: true
		}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true
		}))
		.pipe(rename({ suffix: '-out' }))
		.pipe(gulp.dest('./out/'))
		.on('end', function() { reload() });
});

gulp.task('default', ['transform']);
