const Sound = require('node-aplay');
const readline = require('readline');
const { showStats, errorHandler } = require('./db');
const Game = require('./src/Game');

const game = new Game({
  trackLength: 30,
});

function runIn() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.question(`
  Welcome! Please, type your name to play.
  Or type 'stats' to show players statistics
  `, async (input) => {
    if (input === 'stats') {
      console.clear();
      await showStats().catch(errorHandler);
      process.exit();
    } else if (input && input !== 'stats') {
      process.argv[2] = input;
      game.play();
    } else {
      console.log('Invalid input');
      process.exit();
    }
  });
}

runIn();
