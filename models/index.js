const config = require('../config/config')
const {Sequelize, DataTypes, Op} = require("sequelize")
const todo = require('./todo')

const sequelize = new Sequelize(
    config.db.DB_NAME, 
    config.db.DB_USER, 
    config.db.DB_PASS, 
    {
        host: config.db.DB_HOST, 
        dialect: config.db.dialect, 
        operatorsAliases: false, 

        pool: {
            max: config.db.pool.max, 
            min: config.db.pool.min, 
            acquire: config.db.pool.acquire,
            idle: config.db.pool.idle
        }
    }
)

const db = {}

db.sequelize = Sequelize
db.Op = Op
db.sequelize = sequelize

db.todo = require("./todo")(sequelize, Sequelize, DataTypes)
db.user = require('./users')(sequelize, Sequelize, DataTypes)

db.todo.belongsTo(db.user, {
    foreignKey: "author",
})

module.exports = db