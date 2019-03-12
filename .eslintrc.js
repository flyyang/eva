module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "sourceType": 'module',
  },
  "env": {
    "node": true,
    "es6": true,
  },
  globals: {
    "eva": true,
  },
  rules: {
    'strict': 0,
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'class-methods-use-this': 0,
    'func-names': 0,
    'prefer-template': 0,
    'no-bitwise': 0,
    'no-console': 0,
    'no-shadow': 0,
    'global-require': 0,
    'prefer-promise-reject-errors': 0,
  }
};
