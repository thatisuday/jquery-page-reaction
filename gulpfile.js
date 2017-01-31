const
	gulp 			= 	require('gulp'),
	uglify 			= 	require('gulp-uglify'),
	concat 			= 	require('gulp-concat'),
	rename 			= 	require('gulp-rename'),
	sourcemaps 		= 	require('gulp-sourcemaps')
;

/************************************************************************/

gulp.task('js', function(){
	gulp
	.src([__dirname + '/src/**/*.js'])
	.pipe(sourcemaps.init())
	.pipe(concat('plugin.js'))
	.pipe(gulp.dest(__dirname + '/dist'))
	.pipe(rename({suffix : '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(__dirname + '/dist'));
});

/************************************************************************/

gulp.task('build', ['js']);

/************************************************************************/

gulp.task('watch', ['build'], function(){
	gulp.watch([__dirname + '/src/**/*.js'], ['js']);
});