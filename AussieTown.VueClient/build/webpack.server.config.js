const path = require('path')
const webpack = require('webpack')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
var utils = require('./utils')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')	

module.exports = merge(baseWebpackConfig, {
  // The target should be set to "node" to avoid packaging built-ins.
  target: 'node',
  // The entry should be our server entry file, not the default one.
  entry: './src/main.server.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../dist/',
    filename: 'build.js',
    // Outputs node-compatible modules instead of browser-compatible.
    libraryTarget: 'commonjs2'
  },
  // We can remove the devServer block.
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      'vue2-google-maps': './vue2-google-maps-server.js'
    }
  },  		
  // Avoids bundling external dependencies, so node can load them directly from node_modules/
  externals: Object.keys(require('../package.json').dependencies),
  devtool: '#source-map',
  // No need to put these behind a production env variable.
  plugins: [
    // Add the SSR plugin here.
    new VueSSRPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),    	  
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
