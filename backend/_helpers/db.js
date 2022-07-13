const config = require("../config/config.json");
const mysql = require("mysql2-promise")();
const { Sequelize } = require("sequelize");

module.exports = db = {};

const initialize = async () => {
  const { host, port, user, password, database } = config.database;
  mysql.configure({
    host: host,
    user: user,
    password: password,
    database: database,
  });
  await mysql.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // Connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to exported db
  db.User = require("../models/user.model")(sequelize);

  // Sync all models with database
  await sequelize.sync();
};

initialize();
