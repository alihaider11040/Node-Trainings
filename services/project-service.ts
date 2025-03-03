import Project from "../models/project";
import Task from "../models/task";
import User from "../models/user";
import Assignment from "../models/assignment";

import { IAssignment, IProjectAttributes, ITaskAttributes, ITaskInstance } from "../types/models.d";

class ProjectService {
  // Create a new project
  async createProject(projectData: IProjectAttributes): Promise<IProjectAttributes> {
    const newProject = await Project.create({
      name: projectData.name,
      "description" : projectData.description
    });
    return newProject.toJSON() as IProjectAttributes;
  }

  // Create a task inside a project
  async createTask(projectId: number, taskData: ITaskAttributes): Promise<ITaskAttributes> {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found");

    const newTask = await Task.create({ ...taskData, projectId });
    return newTask.toJSON() as ITaskAttributes;
  }

  // Get a project along with its tasks
  async getProjectWithTasks(projectId: number) {
    try {
      const tasks = await Task.findAll({
        where:{
          projectId
        }
      });

      if (!tasks) {
        throw new Error("Tasks not found");
      }

      return tasks;
    } catch (error) {
      throw new Error(`Error fetching project: ${(error as Error).message}`);
    }
  }

  // Assign a task to a user
  async assignTask(taskId: number, userId: number): Promise<IAssignment> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const taskassignment = await Assignment.create({
      userId : (user as any).id,
      taskId : (task as any).id
    });
    return taskassignment.toJSON() as IAssignment;
  }


  async getTasksByUser(userId: number): Promise<ITaskInstance[]> {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          through: { attributes: [] }, // Exclude junction table attributes
          where: { id: userId },
        },
      ],
    });
    return tasks.map(task => task.toJSON() as ITaskInstance);
  }
  // Edit a task
  async updateTask(taskId: number, taskData: Partial<ITaskAttributes>): Promise<ITaskAttributes> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");
    await task.update(taskData);
    return task.toJSON() as ITaskAttributes;
  }

  // Delete a task
  async deleteTask(taskId: number): Promise<boolean> {
    const task = await Task.destroy({
      where:{id: taskId}
    });
    return task > 0
  }

  // Delete a project
  async deleteProject(projectId: number): Promise<boolean> {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error("Project not found!");

    await project.destroy();
    return true;
  }
}

export default new ProjectService();
