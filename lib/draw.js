var chalk = require('chalk');
var inquirer = require('inquirer');
var winners = require('../lib/winners');

var drawBalls = function ($this) {
	var balls = [];

	while (balls.length < 3) {
		var randNumber = Math.floor((Math.random() * $this.people.length) + 0);
		if (balls.indexOf(randNumber) < 0) {
			balls.push(randNumber);
		}
	}

	return balls;
};

var start = function ($this, callback) {
	if ($this.people.length < 4) {
		console.log(chalk.red('\n  Unable to draw. Atleast three tickets need to get sold before drawing\n'));
		return callback();
	}
	else {
		console.log(chalk.yellow('\n  Tickets sold since last draw: ' + $this.people.length));
		console.log(chalk.yellow('  Total money in the pot: ' + $this.pot + '$\n'));
		var promptArray = [{
			name: 'drawConfirm',
			type: 'confirm',
			message: 'Would you like to draw? ',
			default: true
		}];

		inquirer.prompt(promptArray, function (answers) {
			if (answers.drawConfirm) {
				var totalPrize = $this.pot / 2,
					firstPrize = Math.round(totalPrize * 0.75),
					secondPrize = Math.round(totalPrize * 0.15),
					thirdPrize = Math.round(totalPrize * 0.1);
				$this.winners = [];

				var ballsDrawn = drawBalls($this);

				$this.winners.push(chalk.green($this.people[ballsDrawn[0]] + ':' + firstPrize + '$'));
				$this.winners.push(chalk.green($this.people[ballsDrawn[1]] + ':' + secondPrize + '$'));
				$this.winners.push(chalk.green($this.people[ballsDrawn[2]] + ':' + thirdPrize + '$'));
				$this.pot -= (firstPrize + secondPrize + thirdPrize);
				$this.drawDate = new Date();
				$this.people = [];
				winners.display($this);
			}
			else {
				console.log(chalk.yellow('\n  Draw cancelled!\n'));
			}
			callback();
		});
	}
};

module.exports = {
	start: start
};