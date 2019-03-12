/**
 * Remove unminified output
 */
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

module.exports = class SpeedMeasurePlugin {
  apply({ config, evaConfig }) {
    if (evaConfig.debug === false) return config;
    const smp = new SpeedMeasureWebpackPlugin();
    return smp.wrap(config);
  }
};
