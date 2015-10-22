const chalk = require('chalk');
const NeDB = require('nedb');

const db = new NeDB({
  filename: 'test.db',
  autoload: true
});

module.exports.ns = function(command, args, ns, done) {
  done(args[0]);
};

module.exports.add = function(command, args, ns, done) {
  db.insert({
    name: args[0],
    value: args.slice(1).join(' '),
    ns: ns === 'default' ? undefined : ns
  }, function (err, newDoc) {
    if (err) {
      console.log(chalk.red('Database error'));
    }

    console.log(chalk.green(newDoc.name), 'successfully added');
    done(ns);
  });
};

module.exports.find = function(command, args, ns, done) {
  const query = { name: new RegExp(args[0]) };
  if (ns !== 'default') {
    query.ns = ns;
  }

  db.find(query, function (err, docs) {
    if (err) {
      console.log(chalk.red('Database error'));
    }

    docs.forEach(d => console.log(chalk.cyan(d.name) + ':', d.value));
    done(ns);
  });
}
