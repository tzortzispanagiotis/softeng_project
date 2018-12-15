const Sequelize = require("sequelize");
const dbo = require("./connect.js");

const User = dbo.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
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
});

module.exports = User
