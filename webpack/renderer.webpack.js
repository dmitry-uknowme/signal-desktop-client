module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // fallback: { path: require.resolve('path-browserify') },
  },
  target: 'electron-renderer',
  module: {
    rules: require('./rules.webpack'),
  },
}
