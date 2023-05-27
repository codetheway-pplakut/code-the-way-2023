const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  buildStyleLoaderConfig: (production = false) => {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: false,
      },
    };

    const cssModulesLoader = {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: {
          localIdentName: production
            ? '[contenthash:base64:5]'
            : '[name][local][contenthash:base64:5]',
        },
        sourceMap: false,
      },
    };

    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
        sourceMap: false,
      },
    };

    const sassLoader = {
      loader: 'sass-loader',
      options: { sourceMap: false },
    };

    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              production ? MiniCssExtractPlugin.loader : 'style-loader',
              cssLoader,
            ],
          },
          {
            test: /\.scss$/,
            use: [
              production ? MiniCssExtractPlugin.loader : 'style-loader',
              cssModulesLoader,
              postCssLoader,
              sassLoader,
            ],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          chunkFilename: '[name]-[id].css?v=[contenthash]',
          filename: '[name].css?v=[contenthash]',
        }),
      ],
    };
  },
};
