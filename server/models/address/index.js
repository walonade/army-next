const Sequelize = require("sequelize");
const sequelize = require("./../../utils/database.js");
const Address = sequelize.define("addresses", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.UUID
  },
  value: {
    allowNull: false,
    type: Sequelize.STRING
  },
  lat: {
    allowNull: false,
    type: Sequelize.FLOAT
  },
  lng: {
    allowNull: false,
    type: Sequelize.FLOAT
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});
module.exports = Address;
