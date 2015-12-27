var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      data: __dirname + '/src/data',
      util: __dirname + '/src/util.js'
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?stage=0'],
      include: path.join(__dirname, 'src')
    }]
  }
};
