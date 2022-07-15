const { DataTypes } = require("sequelize");

const model = (sequelize) => {
  const attributes = {};

  return sequelize.define("Like", attributes);
};

module.exports = model;
