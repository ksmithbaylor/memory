const prompt = require('prompt');
const chalk = require('chalk');
const handlers = require('./handlers');

prompt.message = '';
prompt.delimiter = '';

function error(command, args, ns, done) {
  console.log(chalk.red(`${chalk.bold(command)}: command not found`));
  done(ns);
}

function handle(commandString, ns, done) {
  const splitCommand = commandString.split(/\s+/);
  const baseCommand = splitCommand[0];
  const handler = handlers[baseCommand] || error;

  handler(baseCommand, splitCommand.slice(1), ns, done);
}

module.exports = function repl(ns) {
  ns || (ns = 'default');

  prompt.get([{
    name: 'command',
    type: 'string',
    description: chalk.blue(`(${ns}) `) + chalk.green('=>')
  }], (err, result) => {
    handle(result.command, ns, repl);
  });
};
