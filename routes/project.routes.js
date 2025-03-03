const express = require('express');
const {check, param} = require('express-validator')
const router = express.Router();

const validate = require('../middlewares/validate');
const projectController = require('../controllers/projectController');


router.post('/create',[
    check('name').notEmpty().withMessage('Project Name is Required'),
    check('description').notEmpty().withMessage('Project description is Required')
    ], validate,
    projectController.createProject
)


router.post('/createTask/:projectId',
[
    check('title').notEmpty().withMessage('Task title is Required'),
    check('description').notEmpty().withMessage('task description is Required'),
    check('deadline').notEmpty().withMessage('Dealine required!'),
    check('deadline').isDate().withMessage('Enter a valid date'),
],
validate, projectController.createTask
)


router.get('/:projectId',[
    param("projectId").isInt().withMessage('Enter a valid projectId!'), 
], validate,
    projectController.getProjectWithTasks
)

router.get("/user/:userId", [
    param("userId").isInt().withMessage('Enter a valid projectId!'), 
], validate,
projectController.getTasksByUser);





router.post('/assignTask/:taskId/:userId',[

    param('taskId').isInt().withMessage('taskId must be an integer'),
    param('userId').isInt().withMessage('userId must be an integer'),
],   validate,
     projectController.assignTask
    
    
)
router.put(
    '/updateTask/:taskId',
    [
      param("taskId").isInt().withMessage('Invalid taskId, must be an integer'),
      check('title').optional().notEmpty().withMessage('Title cannot be empty'),
      check('description').optional().notEmpty().withMessage('Description cannot be empty'),
      check('status')
        .optional()
        .isIn(['TODO', 'PROGRESS', 'COMPLETE'])
        .withMessage('Invalid status'),
      check('priority')
        .optional()
        .isIn(['HIGH', 'MODERATE', 'LOW'])
        .withMessage('Invalid priority'),
      check('deadline').optional().isISO8601().withMessage('Invalid date format'),
    ],
    validate,
    projectController.updateTask
  );



router.delete('/deleteTask/:taskId', [
    param('taskId').isInt().withMessage('taskId must be an integer')],
    validate,
    projectController.deleteTask
)


router.delete('/deleteProject/:projectId',
    param('projectId').isInt().withMessage('projectId must be an integer'),

     projectController.deleteTask
    
    )


module.exports = router