/**
 * Base webpack config used across other specific configs
 */
import path from 'path';
import webpack from 'webpack';
import validate from 'webpack-validator';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// .env file fallback for environment variables
try {
  require('dotenv').config({silent: true}); // eslint-disable-line
} catch (err) {
  // ignore
}

const extractCSS = new ExtractTextPlugin('[name].css');

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.ico$/,
      loader: `${require.resolve('file-loader')}?name=[name].[ext]`
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: `${require.resolve('url-loader')}?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]`
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: `${require.resolve('url-loader')}?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]`
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: `${require.resolve('url-loader')}?limit=10000&mimetype=application/octet-stream&name=assets/[name].[ext]`
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: `${require.resolve('file-loader')}?name=assets/[name].[ext]`
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: `${require.resolve('url-loader')}?limit=10000&mimetype=image/svg+xml&name=assets/[name].[ext]`
    },
    {
      test: /\.scss$/i,
      loader: extractCSS.extract(['css', 'sass'])
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        GOOGLE_ANALYTICS_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
      }
    }),
    extractCSS,
  ],

  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
});
