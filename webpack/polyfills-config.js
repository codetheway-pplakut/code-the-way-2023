const { ProvidePlugin } = require('webpack');

module.exports = {
  POLYFILLS_CONFIG: {
    plugins: [
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
  },
};
