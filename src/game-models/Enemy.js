class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 30;
  }

  generateSkin() {
    const skins = ['ðū', 'ð', 'ðđ', 'ðŧ', 'ð―', 'ðŋ', 'ðĐ', 'ðĪĄ', 'ðĪš', 'ð§', 'ð§', 'ð'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    this.position -= 1;
  }

  die() {
    this.position = '?';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
