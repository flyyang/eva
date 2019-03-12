const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');

const isWin = process.platform === 'win32';

function getFileExtention(filename) {
  const i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i + 1);
}

function applyRulesInclude(config, dir) {
  const { rules } = config.module;
  rules.forEach((rule) => {
    rule.include = rule.include ? [dir, ...rule.include] : [dir];
  });
  return config;
}

function getDefaultConfig(filename) {
  return path.resolve(__dirname, `../config/defaults/${filename}`);
}

function getBin(binName) {
  return path.resolve(
    __dirname,
    `../node_modules/.bin/${binName}${isWin ? '.cmd' : ''}`,
  );
}

function getModule(moduleName) {
  return path.resolve(
    __dirname,
    `../node_modules/${moduleName}`,
  );
}

function checkDir() {
  if (!fs.existsSync(path.resolve(process.cwd(), 'eva.config.js'))
    && !fs.existsSync(path.resolve(process.cwd(), 'package.json'))
  ) {
    console.log('');
    console.log(chalk.yellow('Eva should work at \'eva\' project root!'));
    console.log('');
    process.exit(0);
  }

  try {
    fs.statSync(path.resolve(process.cwd(), 'src')).isDirectory();
  } catch (err) {
    console.log('');
    console.log(chalk.yellow('Can\'t find src folder, are you in eva project root ?'));
    console.log('');
    process.exit(0);
  }
}

function execSpawn(bin, args = []) {
  return () => {
    spawn(bin, args, {
      stdio: 'inherit',
    }).on('error', (error) => {
      console.log(error);
    });
  };
}

function merge(target, source) {
  // eslint-disable-next-line
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
  }

  return Object.assign({}, target, source);
}

const isMac = os.platform() === 'darwin';

module.exports = {
  applyRulesInclude,
  getDefaultConfig,
  getBin,
  getModule,
  execSpawn,
  checkDir,
  merge,
  getFileExtention,
  isMac,
};
