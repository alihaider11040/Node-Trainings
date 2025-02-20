const { Sequelize, DataTypes } = require('sequelize');
import Task from './task'




const Project = sequelize.define('Project', {
    
  id:{
    type: DataTypes.NUMBER,
    unique: true,
    autoIncrement: true

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
 }
}, 
{
  tableName: 'projects', 
  timestamps: true
  
});

Project.hasmany(Task)



module.exports = Project;