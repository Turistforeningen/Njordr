const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // eslint: {configFile: '.eslintrc'},
  devtool: 'source-map',
  entry: {
    plugin: ['./src/plugin'],
    browser: ['./src/browser'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src'),
        test: /\.jsx?$/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'eslint-loader'},
        ],
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {autoprefixer: true}},
        ],
      },
      {
        test: /\.png$/,
        use: [
          {loader: 'url-loader', options: {limit: 100000}},
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'browser.html',
      template: './src/browser.html',
      chunks: ['browser'],
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|nb|nn/),
    // new webpack.optimize.UglifyJsPlugin(),
  ],
};

