const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  buildCleanConfig: (path) => {
    return {
      plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [path] }),
      ],
    };
  },
};
