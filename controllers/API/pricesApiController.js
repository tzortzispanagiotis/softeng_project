const pricesApiController   = {},
      db                    = require('../../database/connect'), //require sequelize connection
      Op                    = db.sequelizeConnection.Op,
      User                  = db.User,
      Product               = db.Product,
      Shop                  = db.Shop,
      Price                 = db.Price,
      distanceFunction      = require('./diastance'); // function that calculates distance

pricesApiController.getAllAction = (req, res) => {
    var whereClause = {}    // here we will build where clause for sequelize
    var includeClause = {}  // include clause for sequelize
    var searchParams = {}   // here is the final JSON for input on sequelize
    
    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        geoDist: req.query.geoDist || null,
        geoLng :req.query.geoLng || null,
        geoLat : req.query.geoLat || null, 
        dateFrom : req.query.dateFrom || null, 
        dateTo : req.query.dateTo || null, 
        shops : req.query.shopIds || null, 
        products : req.query.productIds || null, 
        tags : req.query.tags || null, 
        sort: req.query.sort || 'id|DESC'
    }
    
    includeClause = 
        [
            {
                model: Product, 
                attributes: ['name','description', 'category','tags']
            },
            {
                model: Shop, 
                attributes: ['name','address','longtitude','latitude', 'tags']
            }
        ]
    

    shopIDs = [] //CHECK IF WORKS
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

    tags = []
    if (params.tags) {
        for (var i in params.tags){
            tags.push(parseInt(params.tags[i]))
        }
        whereClause.productId = {[Op.or] : productIDs}
    }

    sort = params.sort.split('|')

    date = new Date()
    date.setHours(2,0,0,0) //Greek Time Zone
    dateFrom = date
    dateTo = date

    if (params.dateFrom && params.dateTo){
        dateFrom = new Date(req.query.dateFrom)
        dateFrom.setHours(2,0,0,0)
        dateTo = new Date (req.query.dateTo)
        dateTo.setHours(2,0,0,0)
    }

    whereClause.date = {[Op.and]: {[Op.gte]: dateFrom, [Op.lte]: dateTo}}
    

    searchParams = {
        include: includeClause,
        offset: params.start, 
        limit: params.count,
        where: whereClause,
        order: [[sort[0],sort[1]]]
    }

    Price.findAll(searchParams).then(foundPrices => {

    })
    
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