/*
 * Use rollup to generate esm module for pure js
 */
const path = require('path');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');

async function buildWithRollup(config, {
  name,
  entryPath,
}) {
  const nodeModule = [
    path.resolve(__dirname, '../../node_modules'),
    'node_modules/**',
  ];

  const inputOptions = {
    input: entryPath,
    plugins: [
      resolve(),
      json({
        preferConst: true,
        indent: '  ',
      }),
      commonjs({
        include: nodeModule,
        sourceMap: false,
      }),
    ],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    },
  };

  const bundle = await rollup.rollup(inputOptions);
  bundle.write({
    format: 'esm',
    file: `dist/${name}.esm.js`,
    sourcemap: false,
  });
}

module.exports = class EsmPlugin {
  apply({ mode, config, evaConfig }) {
    if (mode === 'production' && evaConfig.esm === true) {
      buildWithRollup(config, evaConfig);
    }
    return config;
  }
};
