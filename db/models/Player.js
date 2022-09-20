const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
    }
  }
  Player.init({
    userName: DataTypes.STRING,
    score: DataTypes.INTEGER,
    enemiesKilled: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
