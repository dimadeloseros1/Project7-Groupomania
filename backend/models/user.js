'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // define association here
      models.User.hasMany(models.post, {
        foreignKey: "UserId"
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING, 
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    postView: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};