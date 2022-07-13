const { DataTypes } = require("sequelize");

const model = (sequelize) => {
  const attributes = {
    desc: { type: DataTypes.STRING, allowNull: true },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  return sequelize.define("Post", attributes);
};

module.exports = model;
