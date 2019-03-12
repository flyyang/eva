const { config } = require('../util/config');

global.eva = {};
eva.config = config;

const { dev, prod } = require('./build');
const lint = require('./lint');
const { init } = require('./init');

module.exports = {
  dev,
  prod,
  lint,
  init,
};
