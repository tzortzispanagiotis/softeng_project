const Sequelize = require("sequelize");
const Credentials = require("../configurations/credentials.js"); 
const bcrypt = require("bcryptjs")
let  myinit  = require("../database/database_init.js");

const sequelize = new Sequelize(Credentials.database.db_name, Credentials.database.username, Credentials.database.password, {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    host: Credentials.host,
    port: 3306,
    dialect: "mariadb" ,
    socketPath: '/var/run/mysqld/mysqld.sock' 
});
    // to achieve mariadb dialect support :
    // npm install --save sequelize@next, npm install --save mariadb
//ExtensionScriptApis

sequelize.authenticate()
.then(() => {
    console.log("Success connecting to databse!");
})
.catch(err => {
    console.error("Unable to connect to the database", err);
})

const User = sequelize.import('./user.js')
const Product = sequelize.import('./products.js')
const Shop = sequelize.import('./shops.js')
const Price = sequelize.import('./prices.js')
const invalidTokens = sequelize.import('./invalidTokens.js')


//  User.sync({force: true}).then(() => {
//     console.log("user model created successfully")})
//     .then(()=>{ User.bulkCreate(myinit.users)})

// Shop.sync({force : true}).then(() => {
//     console.log("shop model created successfully")})
//     .then(() => {  Shop.bulkCreate(myinit.shops)})

// Product.sync({force: true}).then(() => { 
//     console.log("product model created successfully")})
//     .then(()  => { Product.bulkCreate(myinit.products)})

// // Price.sync({ force: false }).then(() => {
// //     console.log("price model created successfully")})
// //     .then(()=>   { Price.bulkCreate(myinit.prices)})
 
// invalidTokens.sync({force : true}).then(() => {
//         console.log("created invalid tokens model")})
    


// Product.belongsToMany(Shop , {through: 'prices',foreignKey: 'productId',onDelete: 'cascade' });
// Shop.belongsToMany(Product, { through: 'prices',foreignKey: 'shopId' ,onDelete: 'cascade'});

// User.hasMany(Price, { foreignKey: 'userId', sourceKey: 'userId' });
// Price.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

Price.belongsTo(Shop, {foreignKey: 'shopId', onDelete: 'cascade'})
Price.belongsTo(Product, {foreignKey: 'productId', onDelete: 'cascade'})
Price.belongsTo(User, {foreignKey: 'userId', onDelete: 'cascade'})

Price.sync({ force: true }).then(() => {
    console.log("price model created successfully")})
    .then(()=>   { Price.bulkCreate(myinit.prices)})
                 

var db = {
    sequelizeConnection: sequelize,
    User: User,
    Product: Product,
    Shop: Shop,
    Price: Price,
    invalidTokens : invalidTokens
}
    
module.exports = db 