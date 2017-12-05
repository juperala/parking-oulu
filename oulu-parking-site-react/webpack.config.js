'use strict';

var path = require('path');
var webpack = require('webpack');
var js_dist = path.join(__dirname, './dist');

module.exports = [{
  name: 'chartComponent',
  entry: {
    line: './line.jsx',
  },
  output: {
    path: js_dist,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx$/],
        loaders: ["jsx-loader?insertPragma=React.DOM&harmony"],
      }
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
    //extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
}];
