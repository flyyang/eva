module.exports = {
  name: 'test',
  globalVar: '',
  noGlobal: true,
  debug: false,
  treeShakingModules: ['panda-captchagroup', 'jakiro'],
  cleanAfterEmit: false,
  vue: true,
  linting: false,
  eslint: {
    rules: {
      'comma-dangle': 0,
    }
  }
}
