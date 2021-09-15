module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
        "user", //Model name
        {
            id: {
                type: DataTypes.UUID, 
                defaultValue: Sequelize.UUIDV4, 
                primaryKey: true
            }, 
            email: {
                type: DataTypes.STRING, 
                unique: true
            }, 
            password: {
                type: DataTypes.STRING
            }, 
            isAdmin: {
                type: DataTypes.BOOLEAN, 
                defaultValue: false, 
            }
        }
    )

    return User
}