/**
 * Just ouput umd iife without global injection
 */

module.exports = class NoGlobalPlugin {
  apply({ config, evaConfig }) {
    if (evaConfig.noGlobal === false) return config;
    delete config.output.library;
    return config;
  }
};
