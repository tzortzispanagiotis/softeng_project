const Sequelize = require("sequelize") ,
       dbo       = require("./connect");
const myinit = require('./database_init');
const Price = require('./prices');

const Shops = dbo.define('shop', {
    shopId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address : {
        type: Sequelize.STRING,
        allowNull: false
    },
    longtitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    shopTags: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // corporation: {
    //     type : Sequelize.STRING ,
    //     allowNull : false
    // }
    withdrawn: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},
{
    tableName: 'shop',
    timestamps: false
})


Shops.sync({force : false}).then(() => {
    console.log("shop model created successfully")})
    .then(() => {  Shops.bulkCreate(myinit.shops)})

module.exports = Shops;
