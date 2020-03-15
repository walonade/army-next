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
    type: Sequelize.FLOAT(11)
  },
  lng: {
    allowNull: false,
    type: Sequelize.FLOAT(11)
  },
  patrol: {
    allowNull: false,
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});
module.exports = Address;
