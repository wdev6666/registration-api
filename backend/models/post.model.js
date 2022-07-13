const { DataTypes } = require("sequelize");

const model = (sequelize) => {
  const attributes = {
    userId: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: true },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  return sequelize.define("Post", attributes);
};

module.exports = model;
