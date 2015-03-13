var srcFolder = 'src/assets/js/'
	, gulp   = require('gulp')
	, coffee = require('gulp-coffee');

// gulp.task('default', ['compile-coffee']);

gulp.task('compile-coffee', function(){
	gulp.src('dev/coffees/**/**/**/**/*.coffee')
	.pipe(coffee())
	.pipe(gulp.dest(srcFolder));
});

gulp.task('default', function () {
	gulp.watch(['dev/coffees/**/*.coffee'], ['compile-coffee']);
});
