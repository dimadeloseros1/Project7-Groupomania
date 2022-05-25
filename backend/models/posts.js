'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    
    static associate(models) {
      // define association here
      models.post.belongsTo(models.User, {
        foreignKey: {
          allowNul: false
        }
      })
    }
  }
  post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    img: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};