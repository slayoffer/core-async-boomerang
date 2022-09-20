const Sound = require('node-aplay');
const { addPlayer, errorHandler } = require('../db');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const runInteractiveConsole = require('./keyboard');

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero();
    this.enemy = new Enemy();
    this.view = new View();
    this.boomerang = new Boomerang();
    this.regenerateTrack();
    this.runInteractiveConsole = runInteractiveConsole;
    this.track = [];
    this.score = 0;
    this.kills = 0;
    this.speed = 150;
    this.increaseSpeed = false;
  }

  regenerateTrack() {
    this.track = (new Array(this.trackLength)).fill('_');
    this.track[0] = '🌲';
    this.track[this.track.length - 1] = '🚪';
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;

    this.track.push(`\n\nYour Health Points: ${this.hero.healthPoints}`);
    this.track.push(`\nYour score: ${this.score}`);
    this.track.push(`\nEnemies killed: ${this.kills}`);
    this.track.push(`\nHealth pack: ${this.hero.healthPack}`);
  }

  async check(interval) {
    if (this.hero.position >= this.enemy.position) {
      this.hero.lives -= 1;
      if (this.hero.lives === 2) {
        this.hero.healthPoints = '❤️ ❤️ 🖤';
        new Sound('./src/sounds/hitSound.wav').play();
      }
      if (this.hero.lives === 1) {
        this.hero.healthPoints = '❤️ 🖤🖤';
        new Sound('./src/sounds/hitSound.wav').play();
      }
      if (this.hero.lives === 0) this.hero.healthPoints = '🖤🖤🖤';
      if (this.hero.healthPoints === '🖤🖤🖤') {
        clearInterval(interval);
        console.clear();
        this.hero.skin = '💀';
        new Sound('./src/sounds/directedBy.wav').play();
        this.regenerateTrack();
        this.view.render(this.track);
        await addPlayer(process.argv[2], this.score, this.kills).catch(errorHandler);
        this.hero.die();
        process.exit();
      } else {
        this.enemy = new Enemy();
      }
    }

    if (this.score === 300 || this.score === 500) this.hero.healthPack = '💊';

    this.enemy.moveLeft();

    if (this.boomerang.position !== this.hero.position && this.boomerang.stance === 1) {
      this.boomerang.moveRight();
    }
    if (this.boomerang.position >= this.enemy.position) {
      new Sound('./src/sounds/hitEnemy.wav').play();
      this.enemy.die();
      this.boomerang.stance = 0;
      this.score += 50;
      this.kills += 1;
      this.enemy = new Enemy();
    }

    if (this.boomerang.position !== this.hero.position && this.boomerang.stance === 0) {
      this.boomerang.moveLeft();
    }
    if (this.hero.position >= this.boomerang.position) {
      this.boomerang.position = undefined;
      this.boomerang.stance = 1;
    }
  }

  async intervalFunc(interval) {
    if (interval) clearInterval(interval);

    const intervalId = setInterval(() => {
      if (this.increaseSpeed) {
        this.increaseSpeed = false;
        this.speed -= 25;
        return this.intervalFunc(intervalId);
      }

      this.check(intervalId);
      this.regenerateTrack();
      this.view.render(this.track);
    }, this.speed);
  }

  play() {
    this.runInteractiveConsole(this.hero, this.boomerang);
    this.intervalFunc();
  }
}

module.exports = Game;
