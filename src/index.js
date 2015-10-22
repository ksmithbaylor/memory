const prompt = require('prompt');
const chalk = require('chalk');

const promptStandard = {
  name: 'command',
  description: chalk.green('=>'),
  type: 'string'
};

prompt.message = '';
prompt.delimiter = '';

function repl() {
  prompt.get([promptStandard], (err, result) => {
    handle(result.command, repl);
  });
}

function handle(command, done) {
  console.log(command);
  done();
}

repl();

process.on('exit', () => console.log());
