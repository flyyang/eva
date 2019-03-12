const merge = require('deepmerge');

module.exports = merge({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        targets: {
          ie: '9',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-export-default-from',
  ].map(require.resolve),
  babelrc: false,
  configFile: false,
  // this solve the babel 7 add import to source code
  // since we have some legacy code write by cmd or amd format
  // which result webpack complain: mix require and export
  sourceType: 'unambiguous',
}, {
  plugins: [
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        // corejs auto pollyfill
        corejs: 2,
      },
    ],
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { loose: true },
    ],
  ],
});
