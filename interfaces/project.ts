export interface IProject {
    id?: number; // Optional because it's auto-generated in DB
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITask {
    id?: number; 
    description: string;
    attachment?: string;
    projectId: number; // Foreign key linking to the Project
    userId?: number; // Optional, assigned when a user is linked to a task
    createdAt?: Date;
    updatedAt?: Date;
}
