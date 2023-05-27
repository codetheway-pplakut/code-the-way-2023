const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  OPTIMIZATION_CONFIG: {
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
      moduleIds: 'named',
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
  },
};
