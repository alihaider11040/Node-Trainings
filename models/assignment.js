const { DataTypes } = require('sequelize');
const db = require('../config/db');

import Task from './task';
import User from './user';

const Assignment = db.define('Assignment', {
  id: {
    type: DataTypes.INTEGER, 
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
}, {
  tableName: 'assignments', 
  timestamps: true
});

User.belongsToMany(Task, {through : Assignment})
Task.belongsToMany(User, {through: Assignment})

export default Assignment;


//Migrations todo