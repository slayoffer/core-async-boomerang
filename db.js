const { table } = require('table');
const { Player } = require('./db/models');

const errorHandler = (error) => {
  console.log('OOOOOPS! Something went wrong!');
  console.log(error);
};

const addPlayer = async (userName, score, enemiesKilled) => {
  try {
    const player = await Player.findOne({ where: { userName }, raw: true });
    if (player == null) {
      await Player.create({ userName, score, enemiesKilled });
    } else {
      console.log('You have already played!');
      await Player.update({ score, enemiesKilled }, { where: { userName } });
    }
  } catch (error) {
    console.log('Enter the name!');
  }
};

const tableConfig = {
  singleLine: true,
};

const showStats = async () => {
  const stats = await Player.findAll({ raw: true });
  stats.sort((a, b) => b.score - a.score);
  const arrForTable = [];
  stats.map((el) => arrForTable.push([`Name: ${el.userName}`, `Scores: ${el.score}`, `Enemies Killed: ${el.enemiesKilled}`]));
  console.log(table(arrForTable, tableConfig));
};

module.exports = { addPlayer, errorHandler, showStats };
