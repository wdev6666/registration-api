const { DataTypes } = require("sequelize");

const model = (sequelize) => {
  const attributes = {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: db.User,
        key: "id",
      },
    },
    FollowId: {
      type: DataTypes.INTEGER,
      references: {
        model: db.User,
        key: "id",
      },
    },
  };

  return sequelize.define("Follower", attributes);
};

module.exports = model;
