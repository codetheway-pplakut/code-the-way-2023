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
    };
  },
};
