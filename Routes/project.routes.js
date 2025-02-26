const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.post('/create', projectController.createProject)
router.post('/createTask/:projectId', projectController.createTask)


router.get('/:projectID', projectController.getProjectWithTasks)
router.post('/:taskId/:userId', projectController.assignTask)

router.put('/updateTask/:taskId', projectController.editTask)

router.delete('/deleteTask/:taskId', projectController.deleteTask)
router.delete('/deleteProject/:projectId', projectController.deleteTask)


module.exports = router