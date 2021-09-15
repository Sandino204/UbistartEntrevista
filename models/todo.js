module.exports = (sequelize, Sequelize, DataTypes) => {
    const Todo = sequelize.define(
        "todo", // Model Name
        {
            id: {
                type: DataTypes.UUID, 
                defaultValue: Sequelize.UUIDV4, 
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING, 
                allowNull: false, 
            },
            description: {
                type: DataTypes.STRING(1234), 
                allowNull: false, 
            },
            isCompleted:{
                type: DataTypes.BOOLEAN, 
                allowNull: false,
                defaultValue: false
            }, 
            createdAt: {
                type: DataTypes.DATE, 
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            prediction:{
                type: DataTypes.DATE, 
                allowNull: false
            },
            completedAt: {
                type: DataTypes.DATE, 
            }, 
        }, 
        {foreignKey: 'author'}
    )

    return Todo
}