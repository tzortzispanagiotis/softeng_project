module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define('product', {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productTags: {
            type: DataTypes.STRING,
            allowNull: false
        },
        withdrawn: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'product',
        timestamps: false
    })
    return Product;
}
