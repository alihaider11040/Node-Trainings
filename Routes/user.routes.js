const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');


router.get('/contact', userController.getContact)
router.get('/about',userController.getAbout )
router.get('/services', userController.getServices)


module.exports = router;

