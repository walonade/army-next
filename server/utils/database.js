const Sequelize = require('sequelize');
const DB_NAME = "node_db"
const DB_USER = "root"
const DB_PASSWORD = "!QAZ2wsx"
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql"
})

module.exports = sequelize
