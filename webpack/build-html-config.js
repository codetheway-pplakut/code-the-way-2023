const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  buildHtmlConfig: ({
    faviconPath,
    templateParameters,
    templatePath,
    title,
  } = {}) => {
    return {
      plugins: [
        new HtmlWebpackPlugin({
          favicon: faviconPath,
          filename: 'index.html',
          inject: true,
          minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          },
          template: templatePath,
          templateParameters,
          title,
        }),
      ],
    };
  },
};
