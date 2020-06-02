const Sequelize = require("sequelize")
const sequelize = require("./../../utils/database.js")
const Address = require("./../address")

const Crime = sequelize.define("crimes", {
 id: {
  primaryKey: true,
  allowNull: false,
  type: Sequelize.UUID,
 },
 type: {
  allowNull: false,
  type: Sequelize.STRING,
 },
 date: {
  allowNull: false,
  type: Sequelize.DATE,
 },
 address: {
  allowNull: false,
  type: Sequelize.STRING,
 },
 addressNote: {
    allowNull: true,
    type: Sequelize.STRING,
 },
 object: {
  allowNull: false,
  type: Sequelize.STRING,
 },
 rota: {
  allowNull: false,
  type: Sequelize.INTEGER,
 },
 kui: {
  allowNull: false,
  type: Sequelize.BIGINT,
 },
 service: {
  allowNull: false,
  type: Sequelize.STRING,
 },
 patrolWay: {
  allowNull: true,
  type: Sequelize.STRING,
 },
 createdAt: {
  type: Sequelize.DATE,
 },
 updatedAt: {
  type: Sequelize.DATE,
 },
})
Crime.belongsTo(Address, {
 foreignKey: "addressId",
 as: "AddressId",
})
Address.hasMany(Crime)
module.exports = Crime
