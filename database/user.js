
module.exports = function(sequelize, DataTypes) {

    const User = sequelize.define('user', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type:DataTypes.ENUM('ADMIN','USER'),
            allowNull:false
        },
        reportCount: {
            type:DataTypes.INTEGER, 
            allowNull:false, 
            defaultValue: 0
        }
    });

    return User;
}