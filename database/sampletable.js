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
    });
});

module.exports = User
