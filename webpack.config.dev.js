// jscs:disable
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      // 'webpack/hot/only-dev-server',
      // 'webpack-hot-middleware/client?reload=true',
      './src/client.js'
    ],
    editor: ['./src/routes/Editor'],
    post: ['./src/routes/Post'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/build/static/'
  },
  resolve: {
    root: path.resolve(__dirname, 'dist'),
    alias: {
      constants: 'constants',
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js', 2),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'react-hot!babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
      include: path.join(__dirname, 'src')
    }]
  }
};
