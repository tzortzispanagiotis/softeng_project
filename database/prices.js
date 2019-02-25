module.exports = function(sequelize, DataTypes) {

    const Prices = sequelize.define('prices', {

        userId: {
            type: DataTypes.INTEGER,
            allownull:false
        },
        productId: {
            type: DataTypes.INTEGER,
            //primaryKey: true,
            allowNull: false
        },
        shopId: {
            type: DataTypes.INTEGER,
            //primaryKey:true,
            allowNull: false
        },
       
        priceId: {
            type: DataTypes.INTEGER ,
            primaryKey: true , 
            autoIncrement: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'prices',
        timestamps: true,
        createdAt: false,
        //updatedAt: 'updatedAt',
        deletedAt: false
    })
    return Prices;
}
