const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  buildCopyFilesConfig: (patterns = []) => {
    return {
      plugins: [
        new CopyWebpackPlugin({
          patterns,
        }),
      ],
    };
  },
};
