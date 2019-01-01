const Sequelize = require("sequelize");
const Credentials = require("../configurations/credentials.js"); 

const sequelize = new Sequelize(Credentials.database.db_name, Credentials.database.username, Credentials.database.password, {
    host: Credentials.host,
    port: 3306,
    dialect: "mariadb"
    // to achieve mariadb dialect support :
    // npm install --save sequelize@next, npm install --save mariadb
})

sequelize.authenticate()
.then(() => {
    console.log("Success connecting to databse!");
})
.catch(err => {
    console.error("Unable to connect to the database", err);
})

const User = sequelize.import('./user.js')

var db = {
    sequelizeConnection: sequelize,
    User: User
}
module.exports = db;