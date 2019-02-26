module.exports = function(sequelize, DataTypes) {

    const invalidTokens = sequelize.define('invalidTokens', {
        tokenId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName: 'invalidTokens',
        timestamps: false
    })
    return invalidTokens;
}