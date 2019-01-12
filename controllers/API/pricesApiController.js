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



module.exports = pricesApiController;