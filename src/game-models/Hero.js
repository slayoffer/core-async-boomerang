const cfonts = require('cfonts');

class Hero {
  constructor(position = 1) {
    this.skin = '🤠🔪';
    this.position = position;
    this.healthPoints = '❤️ ❤️ ❤️';
    this.lives = 3;
    this.healthPack = '0';
  }

  moveLeft() {
    this.position -= 1;
  }

  moveRight() {
    this.position += 1;
  }

  attack() {
    this.boomerang.fly();
  }

  die() {
    cfonts.say('YOU ARE DEAD!', {
      font: 'console',
      align: 'left',
      colors: ['red', 'red'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0',
      gradient: false,
      independentGradient: true,
      transitionGradient: false,
      env: 'node',
    });
  }
}

module.exports = Hero;
