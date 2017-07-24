'use strict';
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'raw-loader' },
      {
        test: /\.css$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?presets[]=es2015&plugins[]=transform-runtime'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
};