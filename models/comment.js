const { DataTypes } = require('sequelize');
const db = require('../config/db');


import Task from './task'
import User from './user'

const task_comment = db.define('task_comment', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'task_comments',
  timestamps: true
});

// Associations
User.hasMany(task_comment, { as: 'comments', foreignKey: 'userId' });
task_comment.belongsTo(User, { foreignKey: 'userId' });

Task.hasMany(task_comment, { as: 'comments', foreignKey: 'taskId' });
task_comment.belongsTo(Task, { foreignKey: 'taskId' });


export default task_comment
