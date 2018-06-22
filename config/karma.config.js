module.exports = (config) => {
  config.set({
    autoWatchBatchDelay: 500,
    basePath: '../',
    browsers: ['ChromiumHeadless'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './src/test.setup.js',
    ],
    frameworks: ['mocha'],
    preprocessors: {
      './src/test.setup.js': ['webpack'],
    },
    webpack: require('./webpack.config.js'),
  });
};
