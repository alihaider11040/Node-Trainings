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
  description: string;
  status: 'TODO' | 'PROGRESS'|'COMPLETE'

}

export interface IProjectInstance extends Model<IProjectAttributes>, IProjectAttributes {}

// **Interface for Task Model**
export interface ITaskAttributes {
  id: number;
  title: String;
  description: string;
  status: "TODO" |"PROGRESS" | 'COMPLETE';
  priority: "HIGH" | "MODERATE" | "LOW";
  deadline : Date;
  projectId: number;
}

export interface ITaskInstance extends Model<ITaskAttributes>, ITaskAttributes {}

export interface IAssignment {
    id?: number;
    userId: number;  // Foreign key reference to User
    taskId: number;  // Foreign key reference to Task
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IAssignmentInstance extends Model<IAssignment>, IAssignment {}


  export interface IAttachment {
    id?: number;
    file_name: string;
    file_url?: string;
    taskId: number;  // Foreign key reference to Task
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IAttachmentInstance extends Model<IAttachment>, IAttachment {}