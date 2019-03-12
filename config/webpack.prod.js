const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanAfterEmitWebpackPlugin = require('clean-after-emit-webpack-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

const {
  chunkPath,
  cleanAfterEmit,
} = eva.config;

const prodConfig = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /chunk.*js$|\.min\.js$/,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'muse-cdn-loader',
          options: {
            ssl: true,
            sSSLHost: 's.h2.pdim.gs',
            cache: true,
          },
        },
      },
    ],
  },
};

if (cleanAfterEmit) {
  prodConfig.plugins.push(
    new CleanAfterEmitWebpackPlugin({
      paths: [chunkPath],
    }),
  );
}

module.exports = prodConfig;
