const merge = require('deepmerge');

// This place can't use eva global
// cause we are running at child process
const { eslint } = require('../../util/config.js').config;

module.exports = merge({
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    allowImportExportEverywhere: true,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    $: false,
    PDR: false,
    jQuery: false,
  },
  rules: {
    strict: 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'class-methods-use-this': 0,
    'func-names': 0,
    'prefer-template': 0,
    'no-bitwise': 0,
    'no-console': 0,
    'global-require': 0,
    'prefer-promise-reject-errors': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'eol-last': 0,
    'arrow-parens': 0,
  },
}, eslint || {});
