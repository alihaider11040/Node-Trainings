const { Sequelize, DataTypes } = require('sequelize');

import Project from './project'
import User from './user'


const Task = sequelize.define('Task', {

  id:{
    type: DataTypes.NUMBER,
    unique: true,
    autoIncrement: true

  },
  description: {
    type: DataTypes.STRING,
    allowNull: false, 
 },
  attachment:{
    type: DataTypes.STRING,
 },
}, 
{
  tableName: 'task', 
  
});

Task.belongsTo(Project)
Task.hasMany(User)


module.exports = Task;