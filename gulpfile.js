var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject'),
    serve = require('gulp-serve'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    es6transpiler = require('gulp-es6-transpiler');

var conf = require('./gulp/gulp.config.js');

var buildPath = function () {
  return Array.from(arguments).join('');
};

gulp.task('default', function(callback) {
  runSequence('test',
              'build',
              'watch',
              'serve',
              callback);
});

gulp.task('build', function(callback) {
  runSequence('clean', 'copy-files', 'inject-index', callback);
});

gulp.task('clean', function() {
  return del([conf.deploy_dir], {force : true});
});

gulp.task('copy-files', ['copy-html', 'copy-assets', 'copy-app-js']);

gulp.task('copy-html', function () {
  return gulp.src([buildPath(conf.src_dir,'/**/*.html'), buildPath('!', conf.src_dir, '/index.html')])
      .pipe(gulp.dest(conf.deploy_dir));
});

gulp.task('copy-assets', function() {
  return gulp.src(buildPath(conf.src_dir,'/assets/**/*'))
      .pipe(gulp.dest(buildPath(conf.deploy_dir, '/assets')))
});

gulp.task('copy-app-js', function() {
  return gulp.src(buildPath(conf.src_dir,'/app/**/*.js'))
      //.pipe(es6transpiler())
      .pipe(gulp.dest(buildPath(conf.deploy_dir, '/app')))
});

gulp.task('inject-index', function() {
  return gulp.src('./src/index.html')
          .pipe(inject(gulp.src(conf.app_files.tpl_src, {read: false}), {ignorePath: conf.inject_ignore_dir}))
          .pipe(gulp.dest(conf.deploy_dir))
});

gulp.task('serve', serve('static'));

gulp.task('lint', function() {
  return gulp.src(conf.app_files.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('./invalidpath')
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
      }))
      .on('error', function(err) {
        console.log(err);
        this.emit('end');
      });
});

gulp.task('watch', function() {
  return gulp.watch(conf.app_files.js, ['lint', 'test', 'build']);
});
