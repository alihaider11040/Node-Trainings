const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');


router.post('/login', userController.getContact)
router.post('/signUp',userController.getAbout )
router.put('/updateProfile', userController.getServices)




module.exports = router;

