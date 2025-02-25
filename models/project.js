const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db')

import Task from './task';

const Project = db.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
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

export default Project
