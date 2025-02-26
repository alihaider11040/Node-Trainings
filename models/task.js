const { DataTypes } = require('sequelize');
const db = require('../config/db');

import Project from './project';


const Task = db.define('Task', {
  id: {
    type: DataTypes.INTEGER, 
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  title:{
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.ENUM('TODO' ,'PROGRESS', 'COMPLETE'),
    defaultValue: 'TODO'
  },
  priority: {
    type: DataTypes.ENUM('HIGH', 'MODERATE', 'LOW'),
    defaultValue: 'LOW'
  },
  deadline:{
    type: DataTypes.DATE
  }
}, {
  tableName: 'tasks', 
  timestamps: true
});

Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
export default Task;


//Migrations todo