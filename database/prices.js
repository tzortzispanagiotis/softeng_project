module.exports = function(sequelize, DataTypes) {

    const Prices = sequelize.define('prices', {
        priceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        tableName: 'prices',
        timestamps: true,
        createdAt: false,
        updatedAt: 'updatedAt',
        deletedAt: false
    })
    return Prices;
}
