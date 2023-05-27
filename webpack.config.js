const path = require('path');

const { merge } = require('webpack-merge');
const { OPTIMIZATION_CONFIG } = require('./webpack/optimization-config');
const { buildCleanConfig } = require('./webpack/build-clean-config');
const { buildDevServerConfig } = require('./webpack/build-dev-server-config');
const { buildFileLoaderConfig } = require('./webpack/build-file-loader-config');
const { buildHtmlConfig } = require('./webpack/build-html-config');
const {
  buildStyleLoaderConfig,
} = require('./webpack/build-style-loader-config');
const { POLYFILLS_CONFIG } = require('./webpack/polyfills-config');

const BASE_DIR = '';
const OUTPUT_DIR = 'docs';
const OUTPUT_PUBLIC_PATH = '';
const TITLE = 'UI Project Starter | Code The Way';
const SITE_NAME = 'UI Project Starter';
const URL = 'https://github.com/joeyschroeder/code-the-way-2023';
const DESCRIPTION = 'A project to help jump-start Code The Way UI development.';

const OUTPUT_PATH = path.resolve(__dirname, OUTPUT_DIR);

const COMMON_CONFIG = merge([
  POLYFILLS_CONFIG,
  {
    entry: path.resolve(
      __dirname,
      path.join(__dirname, BASE_DIR, 'src/index.js')
    ),
  },
  {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: { babelrc: true, cacheDirectory: true },
          },
        },
      ],
    },
  },
  {
    resolve: {
      alias: {
        '@mui/material': '@mui/joy',
      },
    },
  },
  buildHtmlConfig({
    faviconPath: path.join(__dirname, BASE_DIR, 'src/images/favicon.png'),
    templatePath: path.join(__dirname, BASE_DIR, 'src/templates/main.ejs'),
    title: TITLE,
    templateParameters: {
      description: DESCRIPTION,
      siteName: SITE_NAME,
      url: URL,
    },
  }),
]);

const DEVELOPMENT_CONFIG = merge([
  COMMON_CONFIG,
  { devtool: 'eval-cheap-module-source-map' },
  buildDevServerConfig(),
  buildFileLoaderConfig(),
  buildStyleLoaderConfig(),
]);

const PRODUCTION_CONFIG = merge([
  COMMON_CONFIG,
  OPTIMIZATION_CONFIG,
  {
    output: {
      filename: '[name].js?v=[contenthash]',
      path: OUTPUT_PATH,
      publicPath: OUTPUT_PUBLIC_PATH,
    },
  },
  buildCleanConfig(path.resolve(__dirname, OUTPUT_DIR)),
  buildFileLoaderConfig({ filename: 'images/[name][ext]' }),
  buildStyleLoaderConfig(true),
]);

module.exports = ({ production = false, development = false } = {}) => {
  let mode = 'none';

  if (development) mode = 'development';
  if (production) mode = 'production';

  process.env.BABEL_ENV = mode;

  if (production) return merge(PRODUCTION_CONFIG, { mode });
  return merge(DEVELOPMENT_CONFIG, { mode });
};
