const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  eslint: {configFile: '.eslintrc'},
  devtool: 'source-map',
  entry: {
    plugin: './src/plugin',
    browser: './src/browser',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'eslint'],
        include: path.join(__dirname, 'src')
      },
      {test: /\.css$/, loader: 'style-loader!css-loader?-autoprefixer'},
      {test: /\.png$/, loader: 'url-loader?limit=100000'},
      {test: /\.jpg$/, loader: 'file-loader'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader'},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'browser.html',
      template: './src/browser.html',
      chunks: ['browser'],
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb|nn/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
