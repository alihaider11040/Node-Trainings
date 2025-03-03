const projectService = require("../services/project-service").default;

// Create a new projectreq
exports.createProject = async (request, res, next) => {
    try {
        const newProject = await projectService.createProject(request.body);
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        next(error);
    }
};

// Create a task inside a project
exports.createTask = async (request, res, next) => {
    try {
        const { projectId } = request.params;
        const newTask = await projectService.createTask(Number(projectId), request.body);
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        next(error);
    }
};

exports.getProjectWithTasks = async (request, res, next) => {
    try {
      const { projectId } = request.params;
      const project = await projectService.getProjectWithTasks(parseInt(projectId));
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json({ project });
    } catch (error) {
      next(error); // Pass error to middleware
    }
  };




// Assign a task to a user
exports.assignTask = async (request, res, next) => {
    try {
        const { taskId, userId } = request.params;
        const updatedTask = await projectService.assignTask(Number(taskId), Number(userId));
        res.status(200).json({ message: "Task assigned successfully", task: updatedTask });
    } catch (error) {
        next(error);
    }
};


exports.getTasksByUser = async (request, response, next) => {
    try {
      const { userId } = request.params;
      const tasks = await projectService.getTasksByUser(parseInt(userId));
  
      if (!tasks.length) {
        return response.status(404).json({ message: "No tasks assigned to this user" });
      }
  
      response.status(200).json({ tasks });
    } catch (error) {
        next(error);

    }
  };


// Edit a task
exports.updateTask = async (request, response, next) => {
    try {
        const { taskId } = request.params;
        const updatedTask = await projectService.updateTask(Number(taskId), request.body);
        response.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        next(error);
    }
};

// Delete a task
exports.deleteTask = async (request, res, next) => {
    try {
        console.log(request.params)
        
        const { taskId } = request.params;
        console.log(taskId)
        // await projectService.deleteTask(Number(taskId));
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (request, res, next) => {
    try {
        const { projectId } = request.params;
        await projectService.deleteProject(Number(projectId));
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

