const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db')



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
  },
  description: {
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.ENUM('TODO' ,'PROGRESS', 'COMPLETE'),
    defaultValue: 'TODO'
  }
}, {
  tableName: 'projects',
  timestamps: true,
});


export default Project
