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
            shopid: foundPrice.shopid,
            productid:foundPrice.productid,
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
pricesApiController.getOneAction = (req, res) => {
    res.send("HELLO PRICES GETONE!!")
}

pricesApiController.reportAction = (req,res) => {
    var updated ={}
    var updated2={}
        db.Price.findOne({where: {priceId: req.params.id}}).then(found => {
            //osa pedia den exoun oristei ek neou krataw ta palia
                    updated.userId=found.userId
                    updated.priceId= found.priceId ,
                    updated.shopId=found.shopId ,
                    updated.productId=found.productId ,
                    updated.date=found.date ,
                    updated.price=found.price ,
                    updated.reportCount= found.reportCount +1

                    found.update(updated,{fields: ['userId','priceId','shopId','productId','date','price' , 'reportCount']}) //kanw update
                    res.json({
                       success:true  , 
                       message: "Report was filed" 
                    })
    })
    db.User.findOne({where: {userId: updated.userId}}).then(found2 => {
        //osa pedia den exoun oristei ek neou krataw ta palia
            
                updated2.userId= found2.userId ,
                updated2.username=found2.username ,
                updated2.password=found2.password ,
                updated2.email=found2.email ,
                updated2.role=found2.role ,
                updated2.reportCount= found.reportCount +1
                found.update(updated,{fields: ['userId','username','password','email','role', 'reportCount']}) //kanw update
                    res.json({
                       success:true  , 
                       message: "User was reported" 
                    })
})}
module.exports = pricesApiController;