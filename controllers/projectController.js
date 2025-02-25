const projectService = require("../services/project-service");

// Create a new project
exports.createProject = async (req, res, next) => {
    try {
        const newProject = await projectService.createProject(req.body);
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        next(error);
    }
};

// Create a task inside a project
exports.createTask = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const newTask = await projectService.createTask(Number(projectId), req.body);
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        next(error);
    }
};

// Assign a task to a user
exports.assignTask = async (req, res, next) => {
    try {
        const { taskId, userId } = req.params;
        const updatedTask = await projectService.assignTask(Number(taskId), Number(userId));
        res.status(200).json({ message: "Task assigned successfully", task: updatedTask });
    } catch (error) {
        next(error);
    }
};

// Edit a task
exports.editTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await projectService.editTask(Number(taskId), req.body);
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        next(error);
    }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        await projectService.deleteTask(Number(taskId));
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};
