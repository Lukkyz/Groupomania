let Sequelize = require("sequelize");
let db = new Sequelize(
  process.env.DB_TABLE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

module.exports = db;
