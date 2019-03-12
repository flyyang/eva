const path = require('path');

module.exports = class TreeShakingModulePlugin {
  apply({ config, evaConfig }) {
    const {
      treeShakingModules,
      projRoot,
    } = evaConfig;

    if (treeShakingModules.length === 0) return config;
    const { rules } = config.module;
    rules.forEach((rule) => {
      const treeShakingPath = treeShakingModules.map(m => path.resolve(projRoot, `node_modules/${m}`));
      rule.include = rule.include ? [
        rule.include,
        ...treeShakingPath,
      ] : [...treeShakingPath];
    });
    return config;
  }
};
