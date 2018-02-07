'use strict'

/* eslint no-var: 0 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var qs = require('qs');
var autoprefixer = require('autoprefixer');

var TEMPLATE = './src/index.html';
var INDEX = 'index.html';
var JSX_ENTRY_PATH = './src/assets/index.jsx';
var OUTPUT_PATH = '../build';
var PORT = 1337;

module.exports = {
  name: 'frontend-client',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: JSX_ENTRY_PATH,
    vendor: [
      'react',
      'recompose',
      'react-redux',
      'redux',
      'material-ui',
    ],
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_PATH),
    publicPath: '/',
    filename: '[name]__[hash].js',
    chunkFilename: '[name]__[chunkhash].chunk.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                import: true,
                importLoaders: 1,
                localIdentName: '[path][name]_[local]--[hash:base64:8]',
                camelCase: true,
                minimize: true,
                sourceMap: true,
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: path.join(__dirname, './postcss.config.js'),
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  devServer: {
    hot: true,
    port: PORT,
    overlay: true,
    progress: true,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({ clear: false }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new ExtractTextPlugin({
      filename: 'style__[hash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: INDEX,
      template: TEMPLATE,
    }),
    new UglifyJsPlugin(),
  ],
};
