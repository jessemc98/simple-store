var merge = require('webpack-merge')
var common = require('./webpack.config.js')

module.exports = merge(
  {
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'simple-store'
    },
    module: {
      loaders: [
        {
          test: /(\.js)|(\.jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [ "es2015" ]
          }
        }
      ]
    }
  }
  ,common)
