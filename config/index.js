const { config } = require('../util/config');

global.eva = {};
eva.config = config;

// eslint-disable-next-line
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const dev = require('./webpack.dev.js');
const prod = require('./webpack.prod.js');
const { applyRulesInclude } = require('../util/index.js');
const PromisePolyfillPlugin = require('./plugins/PromisePolyfillPlugin.js');
const LibraryExportPlugin = require('./plugins/LibraryExportPlugin.js');
const TreeShakingModulePlugin = require('./plugins/TreeShakingModulePlugin.js');
const BundleAnalyzerPlugin = require('./plugins/BundleAnalyzerPlugin.js');
const MiniOnlyPlugin = require('./plugins/MiniOnlyPlugin.js');
const EsmPlugin = require('./plugins/EsmPlugin.js');
const SpeedMeasurePlugin = require('./plugins/SpeedMeasurePlugin.js');
const NoGlobalPlugin = require('./plugins/NoGlobalPlugin.js');
const LintingPlugin = require('./plugins/LintingPlugin.js');
const VuejsPlugin = require('./plugins/VuejsPlugin.js');
const ExtractCssPlugin = require('./plugins/ExtractCssPlugin.js');

function applyPlugins({ mode, config, evaConfig }) {
  const plugins = [
    new PromisePolyfillPlugin(),
    new LibraryExportPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniOnlyPlugin(),
    new EsmPlugin(),
    new SpeedMeasurePlugin(),
    new NoGlobalPlugin(),
    new LintingPlugin(),
    new VuejsPlugin(),
    new ExtractCssPlugin(),
    new TreeShakingModulePlugin(), // should be the last one which include new compile source
  ];

  plugins.forEach((plugin) => {
    config = plugin.apply({ mode, config, evaConfig });
  });

  return config;
}

module.exports = (mode) => {
  // eslint-disable-next-line
  eva.mode = mode;
  let config;
  if (mode !== 'production') {
    config = merge(base(mode, eva.config), dev, { mode });
  } else {
    config = merge(base(mode, eva.config), prod, { mode });
  }

  config = applyPlugins({ mode, config, evaConfig: eva.config });
  config = applyRulesInclude(config, eva.config.srcPath);

  return config;
};
