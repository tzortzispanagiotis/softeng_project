const Sequelize = require("sequelize")
dbo       = require("./connect");
const myinit = require('./database_init');
const Price = require('./prices');
const Product = require('./products');
const Shop = require('./shops');

const User = dbo.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type:Sequelize.ENUM('ADMIN','USER'),
        allowNull:false
    },
    reportCount: {
        type:Sequelize.INTEGER, 
        allowNull:false, 
        defaultValue: 0
    },
    invalidUser:{
        type:Sequelize.BOOLEAN, 
        allowNull:false , 
        defaultValue:false 
    }

},
{
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

User.sync({force: false}).then(() => {
    console.log("user model created successfully")
})
.then(()=>{ 
    User.bulkCreate(myinit.users)
})


module.exports = User;