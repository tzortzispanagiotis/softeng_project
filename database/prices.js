const Shop      = require("./shops"),
      Product   = require("./products"),
      User      = require("./user"),
      Sequelize = require("sequelize"),
      dbo       = require("./connect");
      const myinit = require('./database_init');

const Prices = dbo.define('prices', {

    // userId: {
    //     type: Sequelize.INTEGER,
    //     allownull:false
    // },
    // productId: {
    //     type: Sequelize.INTEGER,
    //     //primaryKey: true,
    //     allowNull: false
    // },
    // shopId: {
    //     type: Sequelize.INTEGER,
    //     //primaryKey:true,
    //     allowNull: false
    // },
    
    priceId: {
        type: Sequelize.INTEGER ,
        primaryKey: true , 
        autoIncrement: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    reportCount: {
        type:Sequelize.INTEGER, 
        allowNull:false, 
        defaultValue: 0
    }
},
{
    tableName: 'prices',
    timestamps: true,
    createdAt: false,
    //updatedAt: 'updatedAt',
    deletedAt: false
})

Prices.belongsTo(User, { foreignKey: "userId" });
Prices.belongsTo(Shop, { foreignKey: "shopId" });
Prices.belongsTo(Product, { foreignKey: "productId"});

Prices.sync({ force: false }).then(() => {
    console.log("price model created successfully")})
    .then(()=>   { 
        Prices.bulkCreate(myinit.prices)
    })
  
module.exports = Prices
