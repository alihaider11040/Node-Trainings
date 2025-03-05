const { error } = require("console")

const validateAdmin = function (req,res, next){
    if (req.user.role == 'ADMIN'){
        return next()
    }else{
    res.status(401).json({ message: 'Token is not valid' });

    }
} 

module.exports = validateAdmin