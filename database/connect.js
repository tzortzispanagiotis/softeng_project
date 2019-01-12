const Sequelize = require("sequelize");
const Credentials = require("../configurations/credentials.js"); 
const bcrypt = require("bcryptjs")

const sequelize = new Sequelize(Credentials.database.db_name, Credentials.database.username, Credentials.database.password, {
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
const Price = sequelize.import('./prices.js')
const Product = sequelize.import('./products.js')
const Shop = sequelize.import('./shops.js')

Shop.belongsToMany(Product, { through: Price, foreignKey: 'shopId' ,otherKey:'productId' ,onDelete: 'CASCADE'});
//Price.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'shopId',onDelete: 'CASCADE' });
Product.belongsToMany(Shop, { through: Price, foreignKey: 'productId' ,otherKey:'shopId' ,onDelete: 'CASCADE'});

//Product.hasMany(Price, { foreignKey: 'productId', sourceKey: 'productId',onDelete: 'CASCADE' });
//Price.belongsTo(Product, { foreignKey: 'productId', targetKey: 'productId' ,onDelete: 'CASCADE'});


User.sync({ force: true }).then(() => {
    var x = {
        username: 'Nick',
        password: bcrypt.hashSync('Cave', 10),
        email: 'nick@cave.com',
        role: 'ADMIN'
    }
    var y = {
        username: 'Dick',
        password: bcrypt.hashSync('Cave', 10),
        email: 'dick@cave.com',
        role: 'USER'
    }
    User.create(x);
    User.create(y);
})

Shop.sync().then(() => {
    var x1 = {
        name: 'VENZINAREMUNIA',
        address: '43 Venzina Street',
        longtitude: '21.7607735',
        latitude: '38.2279523',
        tags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    var x2 = {
        name: 'VENZINAREMUNIAA',
        address: '43 Venzina Street',
        longtitude: '21.7261374',
        latitude: '38.2391013',
        tags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    Shop.create(x1)
    Shop.create(x2)
})

Product.sync().then(() => {
    var x3 = {
        name: 'AMOLIVDI',
        description: 'LOL',
        category: 'TZINA',
        tags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    var x4 = {
        name: 'DIZEL',
        description: 'LOL',
        category: 'TZINA',
        tags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    Product.create(x3)
    Product.create(x4)
})

Price.sync({ force: true }).then(() => {
    var x5={
        productId:1,
        shopId:1,
        price:1.75 ,
        date:'1/1/2019'

    }
    Price.create(x5)
})




var db = {
    sequelizeConnection: sequelize,
    User: User,
    Product: Product,
    Shop: Shop,
    Price: Price
}

module.exports = db;