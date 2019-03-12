const webpack = require('webpack');

const { port } = eva.config;

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: 'img/[hash:16].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
