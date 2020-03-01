const Sequelize = require("sequelize");
const sequelize = require("./../../utils/database.js");

const Crime = sequelize.define("crimes", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.UUID
  },
  type: {
    allowNull: false,
    type: Sequelize.STRING
  },
  date: {
    allowNull: false,
    type: Sequelize.DATE
  },
  address: {
    allowNull: false,
    type: Sequelize.STRING
  },
  objectOfCrime: {
    allowNull: false,
    type: Sequelize.STRING
  },
  rota: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  kui: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});
