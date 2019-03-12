/**
 * promise pollfill for code spliting
 */

module.exports = class PromisePollyfillPlugin {
  apply({ mode, config, evaConfig }) {
    if (mode !== 'production' || !evaConfig.polyfill) return config;
    const { entry } = config;

    const newEntry = {};
    Object.keys(entry).forEach((name) => {
      newEntry[name] = [require.resolve('core-js/fn/promise'), entry[name]];
    });

    config.entry = newEntry;
    return config;
  }
};
