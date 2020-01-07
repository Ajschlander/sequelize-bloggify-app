module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("Blog", {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    body: DataTypes.STRING
  });
  return Blog;
};
