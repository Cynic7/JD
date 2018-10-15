var gulp=require('gulp');
var minifyhtml=require('gulp-minify-html');
var minifycss=require('gulp-minify-css');
var gulpsass=require('gulp-sass');
var uglifyJS=require('gulp-uglify');
//var babel=require('gulp-babel');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var rename=require('gulp-rename');
var imagemin=require('gulp-imagemin');


//压缩html--*****
gulp.task('uglifyhtml',function(){
	gulp.src('src/*.html')
	.pipe(minifyhtml())//执行html的压缩
	.pipe(gulp.dest('dist/'));
});

//sass的编译
gulp.task('sassBY',function(){			//sass编译到开发目录的css
	gulp.src('src/sass/*.scss')
	.pipe(gulpsass())
	.pipe(gulp.dest('src/css/'));
});

gulp.task('uglifycss',function(){		//开发目录的css压缩到线上目录
	gulp.src('src/css/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css/'));
});

//图片压缩
gulp.task('runimg',function(){
	gulp.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images/'));
});

//第三方插件复制到线上目录
gulp.task('copyjs',function(){
	gulp.src('src/script/thirdplugins/*.js')
	.pipe(gulp.dest('dist/script/thirdplugins/'));
});

//字体文件复制到线上目录
gulp.task('copyfont',function(){
	gulp.src('src/fonts/*')
	.pipe(gulp.dest('dist/fonts/'));
});

//监听所有
gulp.task('default',function(){
	gulp.watch(['src/*.html','src/css/*.css','iamges/*','src/script/thirdplugins/*.js','src/fonts/*'],['uglifyhtml','uglifycss','runimg','copyjs','copyfont']);
});

//sass自动编译
//gulp.task('sass',function(){
//	gulp.watch(['src/css/*.css'],['sassBY']);
//});


//压缩JS   es6会出问题
gulp.task('yasuoJS',function(){
	gulp.src('src/script/js/header.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/script/js/'));
});

