const path = require('path')
const webpack = require('webpack')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
var utils = require('./utils')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')


module.exports = merge(baseWebpackConfig, {
  // The target should be set to "node" to avoid packaging built-ins.
  target: 'node',
  devtool: '#source-map',
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
  // Avoids bundling external dependencies, so node can load them directly from node_modules/
  //externals: Object.keys(require('../package.json').dependencies),
  externals: nodeExternals({
      // do not externalize dependencies that need to be processed by webpack.
      // you can add more file types here e.g. raw *.vue files
      // you should also whitelist deps that modifies `global` (e.g. polyfills)
      whitelist: /\.css$/
  }),
  // No need to put these behind a production env variable.
  plugins: [
    // Add the SSR plugin here.
    new VueSSRServerPlugin(),
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
