const path = require('path');
const glob = require('glob');

const getEntries = ({ srcPath, name }) => {
  const files = glob.sync('index?(.)*.js', { cwd: srcPath });
  const entries = {};
  files.forEach((file) => {
    const matches = file.match(/index.(.+?).js/);
    let extraName = '';
    if (matches && matches.length > 0) [, extraName] = matches;
    entries[
      name + (extraName === '' ? extraName : `-${extraName}`)
    ] = path.resolve(srcPath, file);
  });
  return entries;
};

const getPkgConfig = ({ pkgPath }) => {
  let pkgConfig = {};
  try {
    // eslint-disable-next-line
    pkgConfig.name = require(pkgPath).name;
    // eslint-disable-next-line
    pkgConfig.version = require(pkgPath).version;
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      pkgConfig = {};
    } else {
      console.log(err);
    }
  }
  return pkgConfig;
};

const getDefaultConfig = () => {
  const projRoot = process.cwd();
  return {
    port: 58000,
    projRoot,
    evaRoot: path.resolve(__dirname, '../'),
    srcPath: path.resolve(projRoot, 'src/'),
    entryPath: path.resolve(projRoot, 'src/index.js'),
    distPath: path.resolve(projRoot, 'dist/'),
    chunkPath: path.resolve(projRoot, 'dist/chunk/'),
    pkgPath: path.resolve(projRoot, 'package.json'),
    evaPath: path.resolve(projRoot, 'eva.config.js'),
    polyfill: false,
    exportDefault: true,
    treeShakingModules: [],
    debug: false,
    miniOnly: true,
    debugPort: 58001,
    esm: false,
    linting: true,
    eslint: {},
    styleLint: {},
    noGlobal: false,
    vue: false,
    extractCss: false,
    cleanAfterEmit: true,
  };
};

const getCustomConfig = ({ evaPath }) => {
  let evaConfig = {};

  try {
    // eslint-disable-next-line
    evaConfig = require(evaPath);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      evaConfig = {};
    } else {
      console.log(err);
    }
  }

  return evaConfig;
};

function getEvaConfig() {
  const defaultConfig = getDefaultConfig();
  const pkgConfig = getPkgConfig(defaultConfig);
  const evaConfig = getCustomConfig(defaultConfig);

  const mergedConfig = Object.assign(defaultConfig, pkgConfig, evaConfig);

  // getEntries must be used after config was merged
  // cause we need name of the output
  mergedConfig.entries = getEntries(mergedConfig);

  return Object.assign(mergedConfig, {
    distFilePath: path.resolve(defaultConfig.distPath,
      `${mergedConfig.name}.min.js`),
  });
}

module.exports = {
  config: getEvaConfig(),
};
