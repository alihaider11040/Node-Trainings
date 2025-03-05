const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')


const  validateJWT= (req,res ,next)=>{
    
    
 const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded; // Attach user data to the request object
    console.log(decoded)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = validateJWT
