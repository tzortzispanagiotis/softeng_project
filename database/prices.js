module.exports = function(sequelize, DataTypes) {

    const Prices = sequelize.define('prices', {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            //allowNull: false
        },
        shopId: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            //allowNull: false
        },
       
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
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
