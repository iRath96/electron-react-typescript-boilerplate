/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const validate = require('webpack-validator');
const {
  dependencies: externals
} = require('./app/package.json');

module.exports = validate({
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['ts-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(scss|sass)$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [],

  externals: Object.keys(externals || {})
});
