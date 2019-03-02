const Sequelize = require("sequelize"),
      dbo       = require("./connect");

    const invalidTokens = dbo.define('invalidTokens', {
        tokenId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING,
            allowNull:false
        }
    },
    {
        tableName: 'invalidTokens',
        timestamps: false
    })

    invalidTokens.sync({force : true}).then(() => {
        console.log("created invalid tokens model")})
    
    module.exports = invalidTokens;
