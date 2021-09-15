const express = require('express')
const { signUp, signIn } = require('../controllers/userController')
const verifyEmail = require('../utils/verifyEmail')
const router = express.Router()

router.post('/signup', verifyEmail, signUp)
router.post('/signin', signIn)

module.exports = router