const jwt = require('jsonwebtoken')
const config = require('../config/config')
const db = require('../models')
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.auth.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized!"
        });
      }
  
      req.userId = decoded.id;
  
      next();
    });
};

isAdmin = (req, res, next) => {
    User.findOne({
        where: {
          id: req.userId
        }
    }).then(user => {
        if(user.isAdmin === true){
            return next(); 
        } 

        res.status(403).json({
            message: "Require Admin Role!"
        });
        return;
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            success: false, 
            message: "Something was wrong"
        })
    })

};
  
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt