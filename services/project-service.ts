import Project from "../models/project";
import Task from "../models/task";
import User from "../models/user";
import { IProjectAttributes, ITaskAttributes } from "../types/models.d";

class ProjectService {
  // Create a new project
  async createProject(projectData: IProjectAttributes): Promise<IProjectAttributes> {
    const newProject = await Project.create({
      id: projectData.id,
      name: projectData.name,
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
        include: [
          {
            model: Project,
            as: "project",
          },
        ],
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
  async assignTask(taskId: number, userId: number): Promise<ITaskAttributes> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    (task as any).userId = userId;
    await task.save();
    return task.toJSON() as ITaskAttributes;
  }

  // Edit a task
  async editTask(taskId: number, taskData: Partial<ITaskAttributes>): Promise<ITaskAttributes> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");
    await task.update(taskData);
    return task.toJSON() as ITaskAttributes;
  }

  // Delete a task
  async deleteTask(taskId: number): Promise<boolean> {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error("Task not found");

    await task.destroy();
    return true;
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
