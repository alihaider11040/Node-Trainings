const express = require('express');
const {check, params} = require('express-validator')
const router = express.Router();
const projectController = require('../controllers/projectController');


router.post('/create',
    check('name').notEmpty().withMessage('Project Name is Required'),
    check('description').notEmpty().withMessage('Project description is Required'),
    check('status').notEmpty().withMessage('Project status is Required'),

    projectController.createProject
)


router.post('/createTask/:projectId',
    check('title').notEmpty().withMessage('Task title is Required'),
    check('description').notEmpty().withMessage('task description is Required'),
    check('status').notEmpty().withMessage('task status is Required'),
    check('deadline').notEmpty().withMessage('Dealine required!'),
    check('deadline').isDate().withMessage('Enter a valid date'),

    projectController.createTask
)


router.get('/:projectId',
    params(projectId).isInt().withMessage('Enter a valid projectId!'), 
    projectController.getProjectWithTasks
)

router.post('/:taskId/:userId',

    params('taskId').isInt().withMessage('taskId must be an integer'),
    params('userId').isInt().withMessage('userId must be an integer'),
     projectController.assignTask
    
    
)

router.put('/updateTask/:taskId',
    params('taskId').isInt().withMessage('taskId must be an integer'),
    
    projectController.editTask
)

router.delete('/deleteTask/:taskId', 
    params('taskId').isInt().withMessage('taskId must be an integer'),

    projectController.deleteTask
)


router.delete('/deleteProject/:projectId',
    params('projectId').isInt().withMessage('projectId must be an integer'),

     projectController.deleteTask
    
    )


module.exports = router