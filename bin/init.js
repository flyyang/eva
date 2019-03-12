const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');
const { isMac } = require('../util');

function questions() {
  return inquirer
    .prompt([
      {
        name: 'name',
        message: 'specify your project name:',
      },
      {
        name: 'globalVar',
        message: 'Specify a name plug  to window or just press enter:',
      },
    ]);
}

function isDirExists(name) {
  const aPath = path.resolve(process.cwd(), name);
  return fs.existsSync(aPath);
}


function getFiles({ name }) {
  if (isDirExists(name)) {
    console.log('Directory already exists,');
    // TODO: make a log util
    process.exit(0);
  }
  execSync(`npm pack eva-template@latest &&
    mkdir ${name} &&
    tar -xzf eva-template*tgz -C ${name} --strip 1 &&
    rm -rf eva-template*tgz `, { stdio: ['pipe', 'pipe', 'ignore'] });
}

function replaceTemplate({ name, globalVar }) {
  execSync(`find ./${name} -type f -exec sed -i ${isMac ? "'' -e" : ''} 's/--name--/${name}/g' {} \\;`);
  execSync(`find ./${name} -type f -exec sed -i ${isMac ? "'' -e" : ''} 's/eva-template/${name}/g' {} \\;`);
  execSync(`find ./${name} -type f -exec sed -i ${isMac ? "'' -e" : ''} 's/--globalVar--/${globalVar}/g' {} \\;`);
}

async function init() {
  const answers = await questions();
  try {
    getFiles(answers);
    replaceTemplate(answers);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  init,
};
