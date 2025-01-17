const webpack_config = require('./webpack.dev')

module.exports = (config) => {
  config.set({
    files: [
      '../test/**/*.spec.js',
      '../test/**/*.spec.ts',
    ],
    preprocessors: {
      '../test/**/*.spec.js': ['webpack'],
      '../test/**/*.spec.ts': ['webpack'],
    },
    webpack: webpack_config,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    browsers: [
      'ChromeHeadless',
    ],
    frameworks: [
      'mocha', 'chai',
    ],
    reporters: [
      'mocha',
    ],
    client: {
      captureConsole: true
    },
    singleRun: true,
    autoWatch: false
  })
}
