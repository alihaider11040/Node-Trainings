const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db')

const User = db.define('User', {
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
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures it's a valid email format
    },
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN', 'MANAGER'),
    allowNull: false,
    defaultValue: 'USER', // Default role
  },
}, {
  tableName: 'users',
  timestamps: true, // Adds createdAt & updatedAt fields
});

// Hash password before creating user
// User.beforeCreate(async (user) => {
//   const salt = await bcrypt.genSalt(10);
//   user.hashedPassword = await bcrypt.hash(user.hashedPassword, salt);
// });

// Compare password method
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.hashedPassword);
};

module.exports = User;
