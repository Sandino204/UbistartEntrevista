const express = require('express')
const { create, getAll, finalizeTodo, updateTodo, getAllByUser, getAllLate } = require('../controllers/todoController')
const { verifyToken, isAdmin } = require('../utils/verifyToken')
const router = express.Router()

router.get('/all', verifyToken, isAdmin, getAll)
router.get('/late', verifyToken, isAdmin, getAllLate)
router.get('/', verifyToken, getAllByUser)
router.post('/', verifyToken, create)
router.put('/:id', verifyToken, updateTodo)
router.put('/finalize/:id', verifyToken, finalizeTodo)

module.exports = router