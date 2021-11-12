const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.belongsToMany(models.user , {as:'users', through:"roleusers", foreignKey:"role_id"})
    }
  };
  roles.init({
    role: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};