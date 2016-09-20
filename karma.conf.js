module.exports = function(config) {
  config.set({

    preprocessors: {
      './src/**/*.js' : ['babel'],
      './test/**/*.js' : ['babel']
    },

    babelPreprocessor : {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    },

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/lodash/lodash.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      './src/**/*.js'
    ],

    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity

  });
}
