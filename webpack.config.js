var path = require('path');
var webpack = require('webpack');

module.exports = {
  eslint: {configFile: '.eslintrc'},
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel', 'eslint'],
        include: path.join(__dirname, 'src')
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.png$/, loader: 'url-loader?limit=100000'},
      {test: /\.jpg$/, loader: 'file-loader'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader'}
    ]
  }
};