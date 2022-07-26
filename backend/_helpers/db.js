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

  db.sequelize = sequelize;

  // init models and add them to exported db
  // Older code before added likes table
  db.User = require("../models/user.model")(sequelize);
  db.Post = require("../models/post.model")(sequelize);
  db.Like = require("../models/like.model")(sequelize);
  db.Follower = require("../models/follower.model")(sequelize);
  db.User.hasMany(db.Post, { as: "posts" });
  db.Post.belongsTo(db.User, {
    as: "User",
  });
  db.Post.hasMany(db.Like, { as: "likes" });
  db.Like.belongsTo(db.Post, { as: "Post" });
  db.User.hasMany(db.Like, { as: "likes" });
  db.Like.belongsTo(db.User, { as: "User" });

  db.User.belongsToMany(db.User, { through: db.Follower, as: "Follows" });
  db.Follower.belongsTo(db.User);
  db.User.hasMany(db.Follower);

  /*db.User = require("../models/user.model")(sequelize);
  db.Post = require("../models/post.model")(sequelize);
  db.Like = require("../models/like.model");
  db.User.hasMany(db.Post);
  db.Post.belongsTo(db.User);
  db.User.hasMany(db.Post, { as: "likes", through: "likes" });
  db.Post.hasMany(db.User, { as: "likes", through: "likes" });*/

  // Sync all models with database
  await sequelize.sync();
};

initialize();
