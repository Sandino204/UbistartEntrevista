const config = require('../config/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.user
const Op = db.Op

const userController = {}

userController.signUp = (req, res) => {

    const {email, password} = req.body
    
    //Email Regex
    if(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email)){
        return res.status(500).json({
            success: false, 
            message: "The email is not valid"
        })
    }

    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)){
        return res.status(500).json({
            success: false, 
            message: "The password must have an eight characters, at least one uppercase letter, one lowercase letter and one number"
        })
    }

    User.create({
        email: email, 
        password: bcrypt.hashSync(password, 8)
    })
        .then(user => {
            res.status(200).json({
                success: true, 
                message: "User was registered successfully!"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                success: false, 
                err: err.message
            })
        })
}

userController.signIn = (req, res) => {
    const {email, password} = req.body

    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            if(!user){
                res.status(404).json({
                    success: false, 
                    message: "User not found"
                })
            }

            let passwordIsValid = bcrypt.compareSync(
                password, 
                user.password
            )

            if(!passwordIsValid){
                return res.status(401).json({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user.id}, config.auth.secret, {
                expiresIn: 86400 //24 hours
            })

            res.status(200).json({
                id: user.id, 
                email: user.email, 
                accessToken: token
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                success: false, 
                err: err.message
            })
        })

}

module.exports = userController