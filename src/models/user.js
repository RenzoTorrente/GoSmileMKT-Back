'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.posts, {as:"posts", foreignKey:"userId"}),
      user.belongsToMany(models.roles, {as:'roles', through:"roleusers", foreignKey:"user_id"})
    }
  };
  user.init({
    name:{ 
     type: DataTypes.STRING,
     allowNull: false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    email:{ type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};

