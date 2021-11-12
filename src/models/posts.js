'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {

    static associate(models) {
      posts.belongsTo(models.user, {as:"author", foreignKey:"userId"});
     
    }
  };
  posts.init({
    title: DataTypes.STRING,
    subtitle:DataTypes.STRING,
    body: DataTypes.TEXT,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};