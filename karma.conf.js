// Karma configuration
// Generated on Tue Nov 03 2015 15:51:21 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.1/angular.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular-mocks.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.1/angular-route.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.1/angular-animate.js',
      'https://code.angularjs.org/1.2.16/angular-cookies.min.js',
      'https://cdn.auth0.com/js/lock-7.9.min.js',
      'https://cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js',
      'https://cdn.rawgit.com/auth0/angular-jwt/master/dist/angular-jwt.js',
      'https://cdn.auth0.com/w2/auth0-angular-4.js',

      'client/*.js',
      'client/**/*.js',
      'spec/unit/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    plugins: [
    // Karma will require() these plugins
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter'
    ]
  })
}
