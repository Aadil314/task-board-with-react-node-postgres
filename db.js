const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'myuser', 'mypassword', {
  host: 'db',
  dialect: 'postgres',
});

module.exports = sequelize;
