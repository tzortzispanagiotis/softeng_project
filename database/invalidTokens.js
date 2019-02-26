module.exports = function(sequelize, DataTypes) {

    const invalidTokens = sequelize.define('invalidTokens', {
        tokenId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        token: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        tableName: 'invalidTokens',
        timestamps: false
    })
    return invalidTokens;
}