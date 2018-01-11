var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'


module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-chunk.[chunkhash].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.vue', '.json', '.ts'],
    alias: {
        'public': path.resolve(__dirname, '../public'),
        vue: isProd
            ? 'vue/dist/vue.min.js'
            : 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
       //{
       //  test: /\.js$/,
       //  loader: 'babel-loader',
       //  include: [resolve('src'), resolve('test')],
       //  exclude: /node_modules/
       //},
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },      
      {
          test: /\.s[a|c]ss$/,
          loader: 'style!css!sass'
	},
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  performance: {
      maxEntrypointSize: 300000,
      hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
        //new ExtractTextPlugin({
        //    filename: 'common.[chunkhash].css'
        //})
    ]
    : [
        new FriendlyErrorsPlugin()
    ]
}
