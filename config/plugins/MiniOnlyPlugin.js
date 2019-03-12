/**
 * Remove unminified output
 */

module.exports = class MiniOnlyPlugin {
  apply({ mode, config, evaConfig }) {
    if (mode !== 'production') return config;
    const entry = {};
    if (evaConfig.miniOnly) {
      Object.keys(evaConfig.entries).forEach((k) => {
        entry[`${k}.min`] = evaConfig.entries[k];
      });
    } else {
      Object.assign(entry, evaConfig.entries);
      Object.keys(evaConfig.entries).forEach((k) => {
        entry[`${k}.min`] = evaConfig.entries[k];
      });
    }
    config.entry = entry;
    return config;
  }
};
