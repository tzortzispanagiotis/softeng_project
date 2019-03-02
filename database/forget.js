const Sequelize = require("sequelize"),
      dbo       = require("./connect");

    const forget = dbo.define('invalidTokens', {
        email: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        forgetToken: {
            type: Sequelize.STRING,
            allowNull:false
        } ,
        createdAt: {
            type: Sequelize.DATE ,
            allowNull: false
        }
    },
    {
        tableName: 'forget',
        timestamps: false
    })

    forget.sync({force : true}).then(() => {
        console.log("created invalid tokens model")})
    
    module.exports = forget;
