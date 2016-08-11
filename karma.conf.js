module.exports = function (config) {
    'use strict';
    config.set({

        basePath: '',
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-chrome-launcher'
        ],
        frameworks: ['mocha', 'chai'],

        files: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-ui/jquery-ui.min.js',
            'dist/**/*.js',
            'tests/**/*.test.js',
            'tests/**/*.html'
        ],
        reporters: ['mocha'],

        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
};