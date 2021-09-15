const config = require('../config/config')
const db = require('../models')
const User = db.user;

const verifyEmail = (req, res, next) => {
    User.findOne({
        where: {
          email: req.body.email
        }
    }).then(user => {
        if(!user){
            next()
            return
        }

        res.status(403).json({
            message: "Email already Exists"
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

module.exports = verifyEmail