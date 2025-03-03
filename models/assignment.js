import { DataTypes } from "sequelize";
import db from "../config/db";

import Task from "./task";
import User from "./user";

const Assignment = db.define(
  "Assignment",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Make sure this matches the actual table name
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tasks", // Make sure this matches the actual table name
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "assignments",
    timestamps: true,
  }
);

// Many-to-Many Relationship
User.belongsToMany(Task, {
  through: Assignment,
  foreignKey: "userId",
  otherKey: "taskId",
});

Task.belongsToMany(User, {
  through: Assignment,
  foreignKey: "taskId",
  otherKey: "userId",
});

export default Assignment;
