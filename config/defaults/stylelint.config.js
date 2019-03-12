const merge = require('deepmerge');

// This place can't use eva global
// cause we are running at child process
const { stylelint } = require('../../util/config.js').config;

module.exports = merge({
  extends: 'stylelint-config-standard',
  rules: {
    'declaration-block-no-shorthand-property-overrides': null,
  },
}, stylelint || {});
