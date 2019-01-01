<<<<<<< HEAD
const Sequelize = require("sequelize");
const dbo = require("./connect.js");
const bcrypt = require("bcryptjs");

const User = dbo.define('user', {
    userId: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });

User.sync({ force: true }).then(() => {
    User.create({
        username: "Nick",
        password: bcrypt.hashSync("Cave", 10)
    });
    User.create({
        username: "Nicko",
        password: bcrypt.hashSync("Caveo", 10)
=======
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
        }
    });

    User.sync({ force: true }).then(() => {
        User.create({
            username: "Nick",
            password: "Cave"
        });
        User.create({
            username: "Nicko",
            password: "Caveo"
        });
>>>>>>> d6ab919... improved DB architecture. Users table is ready to go
    });

    return User;
}