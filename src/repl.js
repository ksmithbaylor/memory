const prompt = require('prompt');
const chalk = require('chalk');

const handlers = require('./handlers');

const commandPrompt = {
  name: 'command',
  description: chalk.green('=>'),
  type: 'string'
};

prompt.message = '';
prompt.delimiter = '';

function repl() {
  prompt.get([commandPrompt], (err, result) => {
    handle(result.command, repl);
  });
}

function handle(command, done) {
  const splitCommand = command.split(/\s+/);
  const handler = handlers[splitCommand[0]] || error;

  handler(splitCommand.slice(1), done);
}

function error(args, done) {
  console.log(chalk.red('No command by that name'));
  done();
}

module.exports = repl;
