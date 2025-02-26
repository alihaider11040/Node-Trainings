import { Model, Optional } from "sequelize";

// **Interface for User Model**
export interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
  role: "USER" | "ADMIN";
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {}

export interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, IUserAttributes {}

// **Interface for Project Model**
export interface IProjectAttributes {
  id: number;
  name: string;
}

export interface IProjectInstance extends Model<IProjectAttributes>, IProjectAttributes {}

// **Interface for Task Model**
export interface ITaskAttributes {
  id: number;
  description: string;
  attachment?: string;
  projectId: number;
  userId?: number;
}

export interface ITaskInstance extends Model<ITaskAttributes>, ITaskAttributes {}
