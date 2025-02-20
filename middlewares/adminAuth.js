const { error } = require("console")

module.exports = function (req,res, next){
    if (req.user.role == 'Admin'){
        return next()

    }else{
        throw new error('Invalid User')
    }
} 