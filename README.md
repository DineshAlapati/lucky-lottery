# Lucky Lottery
A command line application for a lottery machine to purchase a lottery ticket, to start a draw, and to display the winners of the draw.

## Features

*	Purchase - Purchase a lottery ticket
*	Draw - Start a draw
*	Winners - Display winners of the draw

## Prerequisites 
Install following applications before running the application

*	git 
*	node.js

## Usage

####	Clone the repository
```bash
$ git clone <repository-url>
```
####	Change the working directory to the cloned repository
```bash
$ cd lucky-lottery
```
####	Install dependencies
```bash
$ npm install
```
####	Run the specs of the module
```bash
$ npm test
```
####	Link the module globally to test the application
``` bash
$ npm link
```

## Run the application
After linking the module globally, to run the application execute following command

```bash
$ lucky-lottery
```

Prompts the user to select the command

```bash
 $ lucky-lottery

  ╦  ╦ ╦╔═╗╦╔═╦ ╦  ╦  ╔═╗╔╦╗╔╦╗╔═╗╦═╗╦ ╦
  ║  ║ ║║  ╠╩╗╚╦╝  ║  ║ ║ ║  ║ ║╣ ╠╦╝╚╦╝
  ╩═╝╚═╝╚═╝╩ ╩ ╩   ╩═╝╚═╝ ╩  ╩ ╚═╝╩╚═ ╩

? What do you want to do? (Use arrow keys)
> PURCHASE  -  purchase lottery ticket
  DRAW      -  start a draw
  WINNERS   -  view winners of the draw
  ──────────────
  exit
```

