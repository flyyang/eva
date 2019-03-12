const path = require('path');
const { spawn } = require('child_process');
const { getBin } = require('../util');

const webpackBin = getBin('webpack');
const webpackDevServerBin = getBin('webpack-dev-server');

function execSpawn(bin, env) {
  eva.mode = env;
  return () => {
    spawn(bin, [
      '--config',
      path.resolve(__dirname, '../config/index.js'),
      '--env',
      env,
    ], {
      stdio: 'inherit',
    }).on('error', (error) => {
      // eslint-disable-next-line
      console.log(error);
    });
  };
}

module.exports = {
  dev: execSpawn(webpackDevServerBin, 'development'),
  prod: execSpawn(webpackBin, 'production'),
};
