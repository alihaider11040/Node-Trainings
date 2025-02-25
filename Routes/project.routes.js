const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.post('/create', projectController.createProject)
// router.post('/createTask')


// router.get('/:projectID')

// router.put('/addTask')
// router.put('/updateTask')

// router.delete('/:projectID')
// router.delete('/:taskID')


module.exports = router