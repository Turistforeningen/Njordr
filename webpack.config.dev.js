var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  eslint: {configFile: '.eslintrc'},
  devtool: 'eval',
  entry: {
    plugin: './src/plugin',
    browser: [
      'webpack-dev-server/client?http://0.0.0.0',
      'webpack/hot/only-dev-server',
      './src/browser',
    ],
  },
  output: {
    path: path.join(__dirname, 'tmp'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel', 'eslint'],
        include: path.join(__dirname, 'src'),
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.png$/, loader: 'url-loader?limit=100000'},
      {test: /\.jpg$/, loader: 'file-loader'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader'},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'browser.html',
      template: './src/browser.html',
      chunks: ['browser'],
    }),
  ],
};
