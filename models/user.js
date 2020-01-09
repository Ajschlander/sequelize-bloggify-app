module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    username: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    password: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });
  return User;
};
