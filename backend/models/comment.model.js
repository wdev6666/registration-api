const { DataTypes } = require("sequelize");

const model = (sequelize) => {
  const attributes = {
    desc: { type: DataTypes.STRING, allowNull: true },
  };

  return sequelize.define("Comment", attributes);
};

module.exports = model;
