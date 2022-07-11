const { DataTypes } = require("sequelize");

const model = (sequelize) => {
  const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email-id required",
        },
        isEmail: { msg: "Enter a valid email id!" },
      },
      unique: { msg: "Email address already in use!" },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Mobile number is already in use!" },
    },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "User" },
    hash: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
};

module.exports = model;
