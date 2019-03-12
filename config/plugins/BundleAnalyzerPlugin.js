/**
 * debug bundle
 */
const BundleAnalyzerPluginWebpack = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = class BundleAnalyzerPlugin {
  apply({ mode, config, evaConfig }) {
    if (mode !== 'production' || evaConfig.debug === false) return config;
    config.plugins = [...config.plugins, new BundleAnalyzerPluginWebpack({
      analyzerHost: '0.0.0.0',
      analyzerPort: evaConfig.debugPort,
    })];
    return config;
  }
};
