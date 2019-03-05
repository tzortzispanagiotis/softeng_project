const Sequelize = require("sequelize"),
dbo       = require("./connect");
const myinit = require('./database_init');
const Price = require('./prices');

const Products = dbo.define('product', {
    productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productTags: {
        type: Sequelize.STRING,
        allowNull: false
    },
    withdrawn: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    },
    {
        tableName: 'product',
        timestamps: false
    })


    Products.sync({force: false}).then(() => { 
        console.log("product model created successfully")})
        .then(()  => { Products.bulkCreate(myinit.products)})
    module.exports = Products;
 