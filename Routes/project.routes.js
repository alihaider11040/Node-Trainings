const router = require('express').Router()


router.post('/create')
router.post('/createTask')


router.get('/:projectID')

router.put('/addTask')
router.put('/updateTask')

router.delete('/:projectID')
router.delete('/:taskID')


module.exports = router