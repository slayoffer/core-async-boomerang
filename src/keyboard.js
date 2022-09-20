const Sound = require('node-aplay');
const keypress = require('keypress');

function healthPack(hero) {
  if (hero.healthPack !== '0') {
    if (hero.healthPoints === '❤️ ❤️ 🖤') {
      new Sound('./src/sounds/omnom.wav').play();
      hero.healthPoints = '❤️ ❤️ ❤️';
      hero.healthPack = '0';
      hero.lives += 1;
    }
    if (hero.healthPoints === '❤️ 🖤🖤') {
      new Sound('./src/sounds/omnom.wav').play();
      hero.healthPoints = '❤️ ❤️ 🖤';
      hero.healthPack = '0';
      hero.lives += 1;
    }
  }
}

function runInteractiveConsole(hero, boomerang) {
  const keyboard = {
    a: () => hero.moveLeft(),
    d: () => hero.moveRight(),
    space: () => (boomerang.position = hero.position + 1) && (this.boomerang.skin = '🌀') && (this.hero.skin = '🤠🔪') && (new Sound('./src/sounds/blaster_cut.wav').play()),
    n: () => (boomerang.position = hero.position + 1) && (this.boomerang.skin = '𐏐') && (this.hero.skin = '🤠🐝') && (new Sound('./src/sounds/whoop.wav').play()),
    h: () => healthPack(hero),
  };

  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

module.exports = runInteractiveConsole;
