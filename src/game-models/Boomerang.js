class Boomerang {
  constructor(position = undefined) {
    this.skin = '🌀';
    this.position = position;
    this.stance = 1;
  }

  fly() {
    this.moveRight();
    this.moveLeft();
  }

  moveLeft() {
    this.position -= 1;
  }

  moveRight() {
    this.position += 1;
  }
}

module.exports = Boomerang;
