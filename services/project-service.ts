import Project from "../models/project"
import Task from "../models/task"
import User from "../models/user";
import { IProject, ITask } from '../interfaces/project'; // Import interfaces
import {} from '../types/models.d'

// Create a new project
export async function createProject(projectData: IProject): Promise<IProject> {
    const newProject = await Project.create({
        id : projectData.id,
        name : projectData.name
    });
    return newProject.toJSON() as IProject;
}

// Create a task inside a project
export async function createTask(projectId: number, taskData: ITask): Promise<ITask> {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found");

    const newTask = await Task.create({ ...taskData, projectId });
    return newTask.toJSON() as ITask;
}


export async function getProjectWithTasks(projectId: Number) {
    try {
      const tasks = await Task.findAll({
        include: [
          {
            model: Project,
            as: 'project', // Matches alias from association
          }
        ]
      });
  
      if (!tasks) {
        throw new Error('tasks not found');
      }
  
      return tasks;
    } catch (error) {
      throw new Error(`Error fetching project: ${error.message}`);
    }
  }



// Assign a task to a user
export async function assignTask(taskId: number, userId: number): Promise<ITask> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    (task as any).userId = userId;
    await task.save();
    return task.toJSON() as ITask;
}

// Edit a task
export async function editTask(taskId: number, taskData: Partial<ITask>): Promise<ITask> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");
    await task.update(taskData);
    return task.toJSON() as ITask;
}

// Delete a task
export async function deleteTask(taskId: number): Promise<boolean> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");
    console.log(task)

    await task.destroy();
    return true;
}

export async function deleteProject(projectId:number): Promise<boolean> {
    const project = await Project.findByPk(projectId)
    if(!project) throw new Error("Project not found!");

    await Project.destroy()
    return true
}
