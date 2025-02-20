const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});
import Task from './task';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Explicitly define as the primary key
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'projects',
  timestamps: true,
});

// Define association correctly
Project.hasMany(Task, { 
  foreignKey: 'projectId', // Explicit foreign key in Task model
  as: 'tasks' // Optional alias
});

// Ensure the Task model has the correct foreign key reference
Task.belongsTo(Project, { 
  foreignKey: 'projectId', 
  as: 'project' // Optional alias
});

module.exports = Project;
