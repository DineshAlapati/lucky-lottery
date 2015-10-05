#! /usr/bin/env node

var inquirer = require('inquirer');
var chalk = require('chalk');

var banner = require('../lib/banner');
var purchase = require('../lib/purchase');
var draw = require('../lib/draw');
var winners = require('../lib/winners');

console.log(chalk.bold.yellow(banner.getBanner));

var promptArray = [], self = this;
self.pot = 200;
self.people = [];

promptArray.push({
	name: 'command',
	type: 'list',
	message: 'What do you want to do?',
	choices: ['PURCHASE  -  purchase lottery ticket',
		'DRAW      -  start a draw',
		'WINNERS   -  view winners of the draw', new inquirer.Separator(), 'exit']
});

function prompt() {
	inquirer.prompt(promptArray, function (answers) {
		if (answers.command.indexOf('PURCHASE  ') > -1) {
			console.log();
			purchase.ticket(self, function () {
				prompt();
			});
		}
		else if (answers.command.indexOf('DRAW  ') > -1) {
			    draw.start(self, function () {
				prompt();
			});
		}
		else if (answers.command.indexOf('WINNERS  ') > -1) {
				winners.display(self);
				prompt();
		}
		else {
			console.log(chalk.bold.yellow('\n  User select to exit. GoodBye!!'));
		}
	});
}

prompt();