/**
 * linting
 */
const StyleLintPlugin = require('stylelint-webpack-plugin');

const {
  getDefaultConfig,
  getModule,
} = require('../../util');

const {
  srcPath,
} = eva.config;


module.exports = class LintingPlugin {
  apply({ mode, config, evaConfig }) {
    if (evaConfig.linting === false) return config;
    config.plugins.push(
      new StyleLintPlugin({
        context: srcPath,
        configFile: getDefaultConfig('stylelint.config.js'),
        files: '**/+(*.css|*.less)',
        fix: mode === 'production',
      }),
    );
    config.module.rules.push({
      test: /\.js|\.vue$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      options: {
        emitError: true,
        emitWarning: true,
        eslintPath: getModule('eslint'),
        configFile: getDefaultConfig('eslintrc.js'),
        fix: mode === 'production',
      },
    });
    return config;
  }
};
