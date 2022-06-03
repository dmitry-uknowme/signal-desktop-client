module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
    // fallback: { path: require.resolve('path-browserify') },
    // fallback: { path: false },
  },
  module: {
    rules: require('./rules.webpack')
  }
}
