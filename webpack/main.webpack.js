const webpack = require('webpack')
const DotenvPlugin = require('dotenv-webpack')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      process: 'process/browser',
    },
    // fallback: { path: require.resolve('path-browserify') },
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  target: 'electron-main',
  plugins: [
    // new DotenvPlugin({
    //   path: '.env',
    // }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'production',
    // }),
    new webpack.DefinePlugin({
      'process.env.API_URL': process.env.API_URL,
    }),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(process.env),
    // }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.API_URL': JSON.stringify(process.env.API_URL),
    // }),
  ],
}
