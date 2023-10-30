const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Lists = require('./list');

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Lists, { as: 'lists' }); 

module.exports = Users;