const { DataTypes } = require('sequelize');
const db = require('../config/db');

import Task from './task';

const Attachment = db.define('Attachment', {
  id: {
    type: DataTypes.INTEGER, 
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_url :{
    type: DataTypes.STRING
  }
}, {
  tableName: 'attachments', 
  timestamps: true
});

Attachment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });


export default Attachment;


//Migrations todo