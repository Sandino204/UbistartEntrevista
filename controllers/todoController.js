const db = require('../models')
const Todo = db.todo
const Op = db.Op
const User = db.user

const todoController = {}

todoController.getAll = (req, res) => {
    Todo.findAll({
        order: [["createdAt", "DESC"]], 
        limit: 25, 
        offset: !isNaN(req.query.page) ? req.query.page * 25 : 0,
        attributes: ["id", "title",  "description", "isCompleted", 
            "createdAt", "prediction", "completedAt"],  
        include: [{
            model: User, 
            attributes: ["email"],
            require: true,
        }]
    })
        .then(data => {
            res.status(200).json({
                success: true, 
                data: data,
                page: !isNaN(req.query.page) ? req.query.page : 0
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

todoController.getAllLate = (req, res) => {

    Todo.findAll({
        order: [["createdAt", "DESC"]], 
        limit: 25, 
        offset: !isNaN(req.query.page) ? req.query.page * 25 : 0,
        where: {
            prediction: {
                [Op.lte]: new Date().toISOString().slice(0, 19).replace('T', ' ')
            },
            isCompleted: false
        },
        attributes: ["id", "title",  "description", "isCompleted", 
            "createdAt", "prediction", "completedAt"],  
        include: [{
            model: User, 
            attributes: ["email"],
            require: true,
        }]
    })
        .then(data => {
            res.status(200).json({
                success: true, 
                data: data,
                page: req.query.page ? req.query.page : 0
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

todoController.getAllByUser = (req, res) => {
    Todo.findAll({
        where: {
            author: req.userId
        }
    })
        .then(data => {
            const result = data.map(test => {

                if((test.prediction > new Date().toISOString().slice(0, 19).replace('T', ' ')) && test.isCompleted === false){
                    test.dataValues.isLate = true
                }else{
                    test.dataValues.isLate = false
                }
                console.log(test)
                return test
            })

            // console.log(result)

            res.status(200).json({
                success: true, 
                data: result
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

todoController.create = (req, res) => {
    const {title, description, prediction} = req.body

    if(!title || !description || !prediction){
        return res.status(500).json({
            success: false, 
            message: "Some data is missing"
        })
    }

    const todo = {
        title, 
        author: req.userId, 
        description, 
        prediction,
    }

    Todo.create(todo)
        .then(data => {
            res.status(201).json({
                success: true, 
                data: data
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

todoController.updateTodo = (req, res) => {
    const {id} = req.params

    const {description, prediction} = req.body

    if(!description && !prediction){
        return res.status(500).json({
            success: true, 
            message: "Some data is Missing"
        })
    }

    Todo.findOne({
        where: {
            id: id, 
        }
    })
    .then(todo => {
        if(!todo){
            return res.status(404).json({
                success: false, 
                message: "Todo not found"
            })
        }

        if(todo.author !== req.userId){
            return res.status(403).json({
                success: false, 
                message: "You are not authorized to edit this todo"
            })
        }

        if(todo.isCompleted === true){
            return res.status(403).json({
                success: false, 
                message: "You are not authorized to modify a finite todo"
            })
        }

        todo.update({
            description: description ? description : todo.description, 
            prediction: prediction ? prediction : prediction,
        })

        return res.status(200).json({
            success: true, 
            data: todo, 
            message: "Todo edited"
        })

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            success: false, 
            message: "Something was wrong"
        })
    })
}

todoController.finalizeTodo = (req, res) => {
    const {id} = req.params

    Todo.findOne({
        where: {
            id: id, 
        }
    })
    .then(todo => {
        if(!todo){
            return res.status(404).json({
                success: false, 
                message: "Todo not found"
            })
        }

        if(todo.author !== req.userId){
            return res.status(403).json({
                success: false, 
                message: "You are not authorized to edit this todo"
            })
        }

        if(todo.isCompleted === true){
            return res.status(403).json({
                success: false, 
                message: "You are not authorized to modify a finite todo"
            })
        }

        todo.update({
            isCompleted: true, 
            completedAt: new Date()
        })

        return res.status(200).json({
            success: true, 
            data: todo, 
            message: "Todo ended"
        })

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            success: false, 
            message: "Something was wrong"
        })
    })
}

module.exports = todoController