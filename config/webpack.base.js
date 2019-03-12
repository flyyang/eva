const path = require('path');
const LessPluginFunctions = require('less-plugin-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  name,
  globalVar,
  srcPath,
  projRoot,
  evaRoot,
} = eva.config;

const {
  getDefaultConfig,
} = require('../util');

module.exports = (mode, evaConfig) => {
  const { extractCss } = evaConfig;
  return ({
    entry: {
      [name]: path.resolve(srcPath, 'index.js'),
    },
    context: path.resolve(__dirname, '../'),
    resolve: {
      symlinks: false,
      modules: [
        path.resolve(evaRoot, 'node_modules'),
        path.resolve(projRoot, 'node_modules'),
      ],
    },
    output: {
      path: path.resolve(srcPath, '../dist/'),
      libraryExport: 'default',
      library: globalVar || name || '',
      libraryTarget: 'umd',
      chunkFilename: 'chunk/js/[chunkhash:16].js',
      umdNamedDefine: true,
      filename: '[name].js',
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // eslint-disable-next-line
                ...require(getDefaultConfig('babel.config.js')),
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          use: [
            {
              loader: 'handlebars-loader',
              options: {
                helperDirs: [path.resolve('src/common/helpers/')],
                inlineRequires: 'image/',
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader',
        },
        {
          test: /\.css$/,
          use: [
            mode === 'production' && extractCss === true
              ? MiniCssExtractPlugin.loader
              : {
                loader: 'style-loader',
                options: {
                  hmr: mode !== 'production',
                  singleton: true,
                },
              },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: ['> 0.001%', 'not ie < 9'],
                  }),
                  require('cssnano')({
                    preset: [
                      'default',
                      { discardComments: { removeAll: true } },
                    ],
                  }),
                ],
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            mode === 'production' && extractCss === true
              ? MiniCssExtractPlugin.loader
              : {
                loader: 'style-loader',
                options: {
                  hmr: mode !== 'production',
                  singleton: true,
                },
              },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: ['> 0.001%', 'not ie < 9'],
                  }),
                  require('cssnano')({
                    preset: [
                      'default',
                      { discardComments: { removeAll: true } },
                    ],
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                plugins: [new LessPluginFunctions()],
              },
            },
          ],
        },
      ],
    },
    stats: {
      children: false,
    },
    optimization: {
      concatenateModules: false,
      usedExports: false,
      providedExports: false,
    },
  });
};
