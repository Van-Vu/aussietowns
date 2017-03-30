const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//Bodom: https://github.com/aspnet/JavaScriptServices/issues/99
//Bodom: need to learn more of vendor.css

module.exports = (env) => {
    // Configuration in common to both client-side and server-side bundles
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: ['.ts', '.js', '.json', '.scss', '.css', '.html'] },
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                { test: /\.ts$/, include: /ClientApp/, use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader'] },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
                {
                    test: /\.scss$/, loader: ExtractTextPlugin.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        // use style-loader in development 
                        fallback: "style-loader"
                    })
                },
                { test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new ExtractTextPlugin("mystyles.css"),
            new CheckerPlugin(),
          new CopyWebpackPlugin([
              { from: './ClientApp/asset/fonts', to: '../asset/fonts' },
              { from: './ClientApp/asset/images', to: '../asset/images' }
          ])
        ]
    };

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main-client': './ClientApp/boot-client.ts' },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig, {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.ts' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};