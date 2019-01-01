const Sequelize = require("sequelize");
const Credentials = require("../configurations/credentials.js"); 
const bcrypt = require("bcryptjs")

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
const Prices = sequelize.import('./prices.js')
const Product = sequelize.import('./products.js')
const Shop = sequelize.import('./shops.js')

User.sync({ force: true }).then()
Prices.sync({ force: true }).then()
Product.sync({ force: true }).then()
Shop.sync({ force: true }).then()

var db = {
    sequelizeConnection: sequelize,
    User: User,
    Product: Product,
    Shop: Shop,
    Prices: Prices
}

module.exports = db;