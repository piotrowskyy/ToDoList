var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');

gulp.task('styles', function() {
	gulp.src('app/scss/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/css'));
});

gulp.task('watch-sass', function() {
	gulp.watch('app/scss/style.scss', ['styles']);
});

gulp.task('webserver', ['watch-sass'], function() {
	gulp.src('app')
	.pipe(server({
		defaultFile: 'index.html',
		livereload: true,
		open: true,
	}));
});