const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    browser: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${process.env.VIRTUAL_HOST}`,
      'webpack/hot/only-dev-server',
      './src/browser',
    ],
    plugin: [
      // 'babel-polyfill',
      // 'react-hot-loader/patch',
      `webpack-dev-server/client?http://${process.env.VIRTUAL_HOST}`,
      'webpack/hot/only-dev-server',
      './src/plugin',
    ],
  },
  output: {
    path: path.join(__dirname, 'tmp'),
    filename: '[name].js',
    publicPath: `http://${process.env.VIRTUAL_HOST}/assets/`,
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src'),
        test: /\.jsx?$/,
        use: [
          {loader: 'babel-loader'},
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
        use: [
          {loader: 'file-loader'},
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['plugin'],
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'browser.html',
      template: './src/browser.html',
      chunks: ['browser'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    publicPath: `http://${process.env.VIRTUAL_HOST}/assets/`,
    public: process.env.VIRTUAL_HOST,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': (
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
      ),
      'Access-Control-Allow-Headers': (
        'X-Requested-With, content-type, Authorization'
      ),
    },
  },
};
