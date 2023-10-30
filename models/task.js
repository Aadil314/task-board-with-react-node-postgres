const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tasks = sequelize.define('Task', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Tasks are not completed by default
  },
  ListId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Lists',
      key: 'id'
    }
  }
});

module.exports = Tasks;