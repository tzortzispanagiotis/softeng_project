const pricesApiController = {},
      db                   = require('../../database/connect'),
      Op                    = db.sequelizeConnection.Op,
      user = db.User;

pricesApiController.getAllAction = (req, res) => {
    var whereClause = {}
    var searchParams = {}

    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        geoDist: req.query.geoDist || null,
        geoLng :req.query.geoLng || null,
        geoLat : req.query.geoLat || null, 
        dateFrom : req.query.dateFrom , 
        dateTo : req.query.dateTo , 
        shops : req.query.shopIds , 
        products : req.query.productIds , 
        tags : req.query.tags , 
        sort: req.query.sort || 'id|DESC'
    }
    
    shopIDs = []
    if (params.shops) { 
        for (var i in params.shops){
            shopIDs.push(parseInt(params.shops[i]))
        }
        whereClause.shopId = {[Op.or] : shopIDs}
    }

    productIDs = []
    if (params.products) {
        for (var i in params.shops){
            productIDs.push(parseInt(params.products[i]))
        }
        whereClause.productId = {[Op.or] : productIDs}
    }




    searchParams = {
        offset: params.start, 
        limit: params.count,
        where: whereClause
    }


    // }
    // if ((dateFrom==null) && (dateTo==null)) {
    //      params.dateFrom =  sequelize.now, //NA TO VALW PALIA XRONIKI STIGMI GIA NA EINAI VALID I ANAZITISIsequelize.literal('CURRENT_TIMESTAMP') ; 
    //      params.dateTo = sequelize.now//sequelize.literal('CURRENT_TIMESTAMP');
    // }
    // findallparam = {
    //     start:params.start ,
    //     count:params.count 
    // }

// db.Price.findAndCountAll({
//     include : {
//         model : db.Shop , 
//         through : {
//             where : {}
//         } 
//     }

//     where = { shopId:  {[Op.in]: params.shops} , productId: {[Op.in]: params.products , date:{[Op.gt]:params.dateFrom , [Op.lt]:params.dateTo} } ,offset : params.start , limit :params.count}).then(found => {
//     var prices= [];
//     var total = 0;
//     foundPrices = found.rows
//     foundPrices.forEach(foundPrice => {
        
//         prices.push ({
//             id: foundPrice.priceId,
//             shopid: foundPrice.shopId,
//             productid:foundPrice.productId,
//             price: foundPrice.price,
//             date: foundPrice.date,
//             //withdrawn: foundPrice.withdrawn
//         })
//         //total++;
//     })
//     res.json({
//         start: findallparam.offset,
//         count: findallparam.limit,
//         total: total,
//         prices: prices

//     })
// })

}

pricesApiController.partialUpdateAction = (req,res) => {  
    // var updatedPrice ={}
    // db.Price.findOne({where: {productId: req.body.productId , shopId: req.body.shopId}})
    // .then(found => { //osa pedia den exoun oristei ek neou krataw ta palia
        
    //     if (req.body.price==null){
    //         updatedPrice.price= found.price
    //     }
    //     else{
    //         updatedPrice.price= req.body.price
    //        }
    //     if (req.body.date==null){
    //         updatedPrice.date= found.date
    //     }
    //     updatedPrice.shopId=found.shopId;
    //     updatedPrice.productId=found.productId;
    //     found.update(updatedPrice,{fields: ['shopId','productId','price','date']}) //kanw update

    // //db.Shop.findOne({where: {shopId: req.params.id}}) //ta emfanizw
    // //.then(found => {
    //    // var tags = found.tags.split(",")
    //     res.json({
    //         shopid: updatedPrice.shopId,
    //         productid:updatedPrice.productId,
    //         price: updatedPrice.price,
    //         date: updatedPrice.date,
    
    //     })
    // })

}

//STILL TO DO SHOW NAME OF SHOP AND PRODUCT INSTEAD OF SHOPID AND PRODUCTID

module.exports = pricesApiController;