/* jshint node: true */
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'lib')
  },
  module: {
    loaders: [
      {
        test: /\.(scss|css|sass)$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname)
      }
    ]
  }
};
