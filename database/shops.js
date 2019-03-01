module.exports = function(sequelize, DataTypes) {
    const Shops = sequelize.define('shop', {
        shopId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address : {
            type: DataTypes.STRING,
            allowNull: false
        },
        longtitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        shopTags: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // corporation: {
        //     type : DataTypes.STRING ,
        //     allowNull : false
        // }
        withdrawn: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'shop',
        timestamps: false
    })
    return Shops;
}