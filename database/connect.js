const Sequelize = require("sequelize");
const Credentials = require("../configurations/credentials.js"); 
const bcrypt = require("bcryptjs")
let  myinit  = require("../database/database_init.js");

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


//  User.sync({force: true}).then(() => {
//      var x = {
//          username: 'Nick',
//          password: bcrypt.hashSync('Cave', 10),
//          email: 'nick@cave.com',
//          role: 'ADMIN'
//      }
//      var y = {
//          username: 'Dick',
//          password: bcrypt.hashSync('Cave', 10),
//          email: 'dick@cave.com',
//          role: 'USER'
//      }
//      User.create(x);
//      User.create(y); }).then(()=>{ User.bulkCreate(myinit.users)})

//      Shop.sync({force : true}).then(() => {
//          var x1 = {
//              name: 'VENZINAREMUNIA',
//              address: '43 Venzina Street',
//              longtitude: '21.7607735',
//              latitude: '38.2279523',
//              tags: 'gtp, oti na nai, lol',
//              withdrawn: false
//          }
//          var x2 = {
//              name: 'IOU',
//              address: '43 Venzina Street',
//              longtitude: '21.7261374',
//              latitude: '38.2391013',
//              tags: 'gtp, oti na nai, lol',
//              withdrawn: false
//          }
//          Shop.create(x1)
//          Shop.create(x2) 
//          }).then(() => {  Shop.bulkCreate(myinit.shops)})

//              Product.sync({force: true}).then(() => {
//                  var x3 = {
//                      name: 'AMOLIVDI',
//                      description: 'LOL',
//                      category: 'TZINA',
//                      tags: 'gtp, oti na nai, lol',
//                      withdrawn: false
//                  }
//                  var x4 = {
//                      name: 'DIZEL',
//                      description: 'LOL',
//                      category: 'TZINA',
//                      tags: 'gtp, oti na nai, lol',
//                      withdrawn: false
//                  }
//                  Product.create(x3)
//                  Product.create(x4) 
//                   }).then(()  => { Product.bulkCreate(myinit.products)})

//                      Price.sync({ force: true }).then(() => {
                   
//                          var x5={
//                                userId:1,
//                              productId:1,
//                              shopId:1,
//                              price:1.75 ,
//                              date:'1/1/2019'
                              
                          
//                             }
//                             Price.create(x5)
//                          })
//                     .then(()=>{
//                      Price.bulkCreate(myinit.prices)
//                      });

 

Price.sync({ force: true }).then(() => {
                   
        var x5={
            userId:1,
            productId:1,
            shopId:1,
            price:1.75 ,
            date:'1/1/2019'
                
            
            }
            Price.create(x5)
        })
                 
Product.belongsToMany(Shop , {through: 'prices',foreignKey: 'productId',onDelete: 'cascade' });
Shop.belongsToMany(Product, { through: 'prices',foreignKey: 'shopId' ,onDelete: 'cascade'});

User.hasMany(Price, { foreignKey: 'userId', sourceKey: 'userId' });
Price.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });





var db = {
    sequelizeConnection: sequelize,
    User: User,
    Product: Product,
    Shop: Shop,
    Price: Price
}
    
module.exports = db 