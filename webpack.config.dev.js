var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      data: __dirname + '/src/data',
      util: __dirname + '/src/util.js',
      processor: __dirname + '/src/licenseProcessor.js'
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?stage=0'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loaders: ['json'],
      include: path.join(__dirname, 'src')
    }]
  }
};
