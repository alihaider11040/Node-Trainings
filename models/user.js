const { Sequelize, DataTypes } = require('sequelize');


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
 },
  hashedPassword:{
    type: DataTypes.STRING,
    allowNull: false
 },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'), 
    allowNull: false, 
  },
}, 
{
  tableName: 'users', 
  
});


module.exports = User;