/**
 * Build config for electron 'Renderer Process' file
 */

import path from 'path';
import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CordovaPlugin from 'webpack-cordova-plugin';

import baseConfig from './webpack.config.base';

const config = validate(merge(baseConfig, {
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    'console-polyfill',
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: './'
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.isWeb': true
    }),

    // Minify without warning messages and IE8 support
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/app.web.html',
      inject: false
    }),

    new CopyWebpackPlugin([
      {
        from: 'app/favicon.ico',
        to: 'favicon.ico'
      },
      {
        from: 'resources/icons',
        to: 'icons'
      }
    ]),

    new CordovaPlugin({
      config: 'mobile/config.xml', // Location of Cordova' config.xml (will be created if not found)
      src: 'index.html', // Set entry-point of cordova in config.xml
      platform: ['android'], // Set `webpack-dev-server` to correct `contentBase` to use Cordova plugins.
      version: true, // Set config.xml' version. (true = use version from package.json)
    }),
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'web'

}));

export default config;
