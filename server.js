var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  watchOptions: {aggregateTimeout: 300, poll: true},
}).listen(8080, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('webpack-dev-server up and running...');
});
