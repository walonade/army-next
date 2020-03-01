const Sequelize = require("sequelize");
const sequelize = require("./../../utils/database.js");
const User = sequelize.define("users", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.UUID
  },
  login: {
    allowNull: false,
    type: Sequelize.STRING
  },
  token: {
    allowNull: true,
    type: Sequelize.STRING
  },
  rota: {
    allowNull: true,
    type: Sequelize.INTEGER
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  isAdmin: {
    allowNull: false,
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});
module.exports = User;
