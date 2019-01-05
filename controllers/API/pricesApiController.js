const pricesApiController = {},
      db                   = require('../../database/connect'),
      user = db.User;
pricesApiController.getAllAction = (req, res) => {
    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        //status: req.query.status || 'ACTIVE',
        sort: req.query.sort || 'id|DESC'
    }
    findallparam = {
        start:params.start ,
        count:params.count }

db.Price.findAll(findallparam).then(foundPrices => {
    var prices= [];
    var total = 0;
    foundPrices.forEach(foundPrice => {
        prices.push ({
            id: foundPrice.priceId,
            shopid: foundPrice.shopId,
            productid:foundPrice.productId,
            price: foundPrice.price,
            date: foundPrice.date,
            //withdrawn: foundPrice.withdrawn
        })
        total++;
    })
    res.json({
        start: findallparam.offset,
        count: findallparam.limit,
        total: total,
        prices: prices

    })
})

}
pricesApiController.partialUpdateAction = (req,res) => {  
    var updatedPrice ={}
    db.Price.findOne({where: {productId: req.body.productId , shopId: req.body.shopId}})
    .then(found => { //osa pedia den exoun oristei ek neou krataw ta palia
        
        if (req.body.price==null){
            updatedPrice.price= found.price
        }
        else{
            updatedPrice.price= req.body.price
           }
        if (req.body.date==null){
            updatedPrice.date= found.date
        }
        updatedPrice.shopId=found.shopId;
        updatedPrice.productId=found.productId;
        found.update(updatedPrice,{fields: ['shopId','productId','price','date']}) //kanw update

    //db.Shop.findOne({where: {shopId: req.params.id}}) //ta emfanizw
    //.then(found => {
       // var tags = found.tags.split(",")
        res.json({
            shopid: updatedPrice.shopId,
            productid:updatedPrice.productId,
            price: updatedPrice.price,
            date: updatedPrice.date,
    
        })
    })

}

//STILL TO DO SHOW NAME OF SHOP AND PRODUCT INSTEAD OF SHOPID AND PRODUCTID

module.exports = pricesApiController;