const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  buildDevServerConfig: ({ proxy } = {}) => {
    return {
      devServer: {
        client: { overlay: true, progress: true },
        historyApiFallback: true,
        hot: true,
        open: false,
        proxy,
      },
      plugins: [
        new ReactRefreshWebpackPlugin({
          overlay: false,
        }),
      ],
    };
  },
};
