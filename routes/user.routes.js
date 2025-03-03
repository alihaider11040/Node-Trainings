const express = require('express');
const {check, params} = require('express-validator')
const router = express.Router();
const userController = require('../controllers/userController');

//validation pending
router.post('/login',
    check('email').isEmail().withMessage('Enter a valid Email'),
    check('password').notEmpty().withMessage('Enter password!'),
    userController.login)
router.post('/signUp' ,
    [
        check("name").notEmpty().withMessage("Name is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        check("password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long"),
        check("role")
          .optional()
          .isIn(["USER", "ADMIN", "MANAGER"])
          .withMessage("Invalid role. Allowed values: USER, ADMIN, MANAGER"),
     ],
    userController.signUp)
router.put('/updateProfile/:userId', 
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    userController.updateUser
)


module.exports = router;
