#!/usr/bin/env node

const program = require('commander');
const emoji = require('node-emoji');
const chalk = require('chalk');

const {
  dev,
  prod,
  lint,
  init,
} = require('./bin');

const { checkDir } = require('./util');


program
  .version(require('./package.json').version)
  .description('Small and delightful sdk cli, i\'am eva');

program
  .command('init')
  .description('init a sdk project')
  .action(() => { init(); });

program
  .command('lint')
  .description('show eslint and style lint errors')
  .action(() => {
    checkDir();
    lint();
  });

program
  .command('lint:fix')
  .description('fix eslint and style lint errors')
  .action(() => {
    checkDir();
    lint({ fix: true });
  });


program
  .command('dev')
  .description('watch changes for development')
  .action(() => {
    checkDir();
    dev();
  });

program
  .command('prod')
  .description('deploy for production')
  .action(() => {
    checkDir();
    prod();
  });

program.on('command:*', () => {
  console.log('');
  console.log(
    emoji.get('warning'),
    chalk.yellow('Command not found, see usage:'),
  );
  console.log(program.helpInformation());
});

program.parse(process.argv);

const NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED) {
  console.log(program.helpInformation());
}
