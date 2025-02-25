const { DataTypes } = require('sequelize');
const db = require('../config/db');

import Project from './project';
import User from './user';

const Task = db.define('Task', {
  id: {
    type: DataTypes.INTEGER, // ✅ Use INTEGER instead of NUMBER
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'tasks', 
  timestamps: true
});

Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

Task.belongsToMany(User, { through: 'UserTasks', foreignKey: 'taskId', as: 'users' });

Task.belongsTo(User, { foreignKey: 'userId', as: 'assignedUser' });

export default Task;