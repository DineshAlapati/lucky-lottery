var chalk = require('chalk');
var inquirer = require('inquirer');

var ticket = function ($this, callback) {
	if ($this.people.length > 50) {
		console.log(chalk.red('You cannot purchase ticket. The pot is full for this draw. Please wait until next draw'));
		return callback();
	}
	else {
		var promptArray = [{
			name: 'customerName',
			type: 'input',
			message: 'Please insert customer name: ',
			validate: function (input) {
				return (input.trim()) ? true : 'Invalid name. Please insert valid name.';
			}
		}];

		inquirer.prompt(promptArray, function (answers) {
			var customerName = answers.customerName.trim().toLowerCase();
			if ($this.people.indexOf(customerName) < 0) {
				$this.people.push(customerName);
				$this.pot += 10;
				console.log(chalk.green('\n  Ball number of ' + customerName + ' is: ' + $this.people.length + '\n'));
			}
			else {
				console.log(chalk.red('\n  Customer already exists!\n'));
			}

			callback();
		});
	}
};

module.exports = {
	ticket: ticket
};