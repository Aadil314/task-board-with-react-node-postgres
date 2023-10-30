const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Tasks = require('./task');

const Lists = sequelize.define('List', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

Lists.hasMany(Tasks, { as: 'tasks' });

module.exports = Lists;