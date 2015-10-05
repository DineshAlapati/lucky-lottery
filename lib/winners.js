var chalk = require('chalk');
var Table = require('cli-table');

var display = function ($this) {
	if ($this.winners.length === 0) {
		console.log(chalk.red('\n  Winners list is empty\n'));
	}
	else {
		console.log(chalk.yellow('\n  Winners of the draw on ' + $this.drawDate + '\n'));
		var table = new Table({
			head: [chalk.yellow('1st ball'), chalk.yellow('2nd ball'), chalk.yellow('3rd ball')]
		});
		table.push($this.winners);
		console.log(table.toString());
		console.log();
	}
};

module.exports = {
	display: display
};