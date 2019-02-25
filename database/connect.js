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
const Product = sequelize.import('./products.js')
const Shop = sequelize.import('./shops.js')
const Price = sequelize.import('./prices.js')

// Price.belongsTo(User, { onDelete: 'CASCADE', hooks:false});
// Price.belongsTo(Product, { onDelete: 'CASCADE', hooks:false});
// Price.belongsTo(Shop, { onDelete: 'CASCADE', hooks:false});

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

Shop.sync({force : true}).then(() => {
    var x1 = {
        name: 'VENZINAREMUNIA',
        address: '43 Venzina Street',
        longtitude: '21.7607735',
        latitude: '38.2279523',
        shopTags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    var x2 = {
        name: 'IOU',
        address: '43 Venzina Street',
        longtitude: '21.7261374',
        latitude: '38.2391013',
        shopTags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    Shop.create(x1)
    Shop.create(x2)
})

Product.sync({force: true}).then(() => {
    var x3 = {
        name: 'AMOLIVDI',
        description: 'LOL',
        category: 'TZINA',
        productTags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    var x4 = {
        name: 'DIZEL',
        description: 'LOL',
        category: 'TZINA',
        productTags: 'gtp, oti na nai, lol',
        withdrawn: false
    }
    Product.create(x3)
    Product.create(x4)
})



// Price.sync({ force: true }).then(() => {
//     var x5={
//         productProductId:1,
//         shopShopId:1,
//         userUserId:1,
//         price:1.75 ,
//         date:'1/1/2019'

//     }
//     Price.create(x5)
//     var x6 = {
//         productProductId:2,
//         shopShopId:2,
//         userUserId:2,
//         price:1.65,
//         date:'1/1/2018'
//     }
//     Price.create(x6)
// })






var db = {
    sequelizeConnection: sequelize,
    User: User,
    Product: Product,
    Shop: Shop,
    Price: Price
}

module.exports = db;