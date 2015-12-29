var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './index',
    'webpack-dev-server/client?//localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'index.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, ''),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['babel-plugin-transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  devServer: {
    contentBase: "./"
  }
};