const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.login)
router.post('/signUp' ,userController.signUp)
router.put('/updateProfile', userController.updateUser)


module.exports = router;
