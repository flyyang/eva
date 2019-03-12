const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = class ExtractCssPlugin {
  apply({ mode, config, evaConfig }) {
    const { name } = evaConfig;
    if (mode !== 'production' || evaConfig.extractCss === false) return config;

    const extractConfig = {
      optimization: {
        splitChunks: {
          cacheGroups: {
            [name]: {
              name,
              test: /\.(css|less)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].min.css',
        }),
      ],
    };
    return merge(config, extractConfig);
  }
};
