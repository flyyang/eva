const {
  getDefaultConfig,
  getBin,
  execSpawn,
} = require('../util');

const {
  srcPath,
} = eva.config;

const lintCss = ({ fix }) => {
  execSpawn(getBin('stylelint'), [
    srcPath + '/**/*.css',
    srcPath + '/**/*.less',
    '--config',
    getDefaultConfig('stylelint.config.js'),
    fix === true ? '--fix' : '',
  ])();
};

const lintJs = ({ fix }) => {
  execSpawn(getBin('eslint'), [
    srcPath,
    '--config',
    getDefaultConfig('eslintrc.js'),
    fix === true ? '--fix' : '',
    '--ext',
    '.js,.vue',
  ])();
};

module.exports = (options = { fix: false }) => {
  lintJs(options);
  lintCss(options);
};
