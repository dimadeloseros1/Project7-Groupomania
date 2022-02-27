module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        
    })
    return Users;
}