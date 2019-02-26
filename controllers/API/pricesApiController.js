const pricesApiController   = {},
      db                    = require('../../database/connect'), //require sequelize connection
      sequelize             = require('sequelize')
      Op                    = sequelize.Op,
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
        shops : req.query.shopId || null, 
        products : req.query.productId || null, 
        tags : req.query.tags || null, 
    }
    
    var sort= {}
    sort[0] = 'price'
    sort[1] = 'ASC'

    temp = req.query.sort
    if (temp){       
        sort = temp.split('|')
        // if not ok, restore default
        if ((sort[0] != 'price') || (sort[0] != 'date')) {
            sort[0] = 'price'
        }
        if (sort[1] != 'ASC') {
            sort[1] = 'DESC'
        }
    }

    includeClause = 
        [
            {
                model: Product, 
                attributes: ['name','description', 'category','productTags']
            },
            {
                model: Shop, 
                attributes: ['name','address','longtitude','latitude', 'shopTags']
            }
        ]
    
    
    shopIDs = [] //CHECK IF WORKS
    if (params.shops) { 
        if (Array.isArray(params.shops)) {
            for (var i in params.shops) {
                console.log(params.shops[i])
                shopIDs.push(parseInt(params.shops[i]))
            }
        }
        else {
            shopIDs.push(parseInt(params.shops))
        }
        whereClause.shopId = {[Op.or] : shopIDs}
    }

    productIDs = []
    if (params.products) {
        if (Array.isArray(params.products)) {
            for (var i in params.products){
                productIDs.push(parseInt(params.products[i]))
            }
        }
        else {
            productIDs.push(parseInt(params.products))
        }
        whereClause.productId = {[Op.or] : productIDs}
    }

    tags = []
    if (params.tags) {
        if (Array.isArray(params.tags)) {
            for (var i in params.tags){
                tags.push(params.tags[i])
            }
        }
        else {
            tags.push(params.tags)
        }
        whereClause.productTags = {[Op.or]: {[Op.or] : tags}}
        //SOS NA TO FTIAKSW
    }

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

    if (params.dateFrom) {
        whereClause.date = {[Op.and]: {[Op.gte]: dateFrom, [Op.lte]: dateTo}}
    }

    searchParams = {
        include: includeClause,
        offset: params.start, 
        limit: params.count,
        where: whereClause,
        order: [[sort[0],sort[1]]]
    }

    Price.findAll(searchParams).then(foundPrices => {
        res.json(foundPrices)
    })
    


}

pricesApiController.reportAction = (req,res) => {
    var updated={}
    var id1 =req.params.id
    function  updateprice(id,res){
        db.Price.findOne({where: {priceId: id}}).then(found => {
            //osa pedia den exoun oristei ek neou krataw ta palia
                    updated.userId=found.userId
                    updated.priceId= found.priceId ,
                    updated.shopId=found.shopId ,
                    updated.productId=found.productId ,
                    updated.date=found.date ,
                    updated.price=found.price ,
                    updated.reportCount= found.reportCount +1
                    found.update(updated,{fields: ['userId','priceId','shopId','productId','date','price' , 'reportCount']}) //kanw update
            return updated;              
}).then(updated1=>{
       //var updated1= await updateprice (updated,id,res)
        console.log(updated1)
        var updated2={}
        db.User.findOne({where: {userId: updated1.userId}}).then(found2 => {
            //osa pedia den exoun oristei ek neou krataw ta palia
                
                    updated2.userId= found2.userId ,
                    updated2.username=found2.username ,
                    updated2.password=found2.password ,
                    updated2.email=found2.email ,
                    updated2.role=found2.role ,
                    updated2.reportCount= found2.reportCount +1
                    if (updated2.reportCount>=10) {updated2.invalidUser=true}
                    else {updated2.invalidUser=false}
                    found2.update(updated2,{fields: ['userId','username','password','email','role', 'reportCount' , 'invalidUser']}) //kanw update
                        // res.json({
                        //    success:true  , 
                        //    message: "User was reported" 
                        // })
    })
            })
        } 
            updateprice(id1,res)
            res.json({
                success:true  , 
                message: "Report was filed" ,
                
             })
    }
module.exports = pricesApiController;