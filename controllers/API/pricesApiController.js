const pricesApiController   = {},
      db                    = require('../../database/connect'), //require sequelize connection
      sequelize             = require('sequelize')
      Op                    = sequelize.Op,
      User                  = require('../../database/user'),
      Product               = require('../../database/products'),
      Shop                  = require('../../database/shops'),
      Price                 = require('../../database/prices') ;
var distanceFunction      = require('./diastance'); // function that calculates distance
      

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
        shops : req.query.shops || null, 
        products : req.query.products || null, 
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
    includeClause = []
    if (!params.geoDist){
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
    }
    else { 
        console.log("giati eisai malakas") 
        var atr=['name','address','longtitude','latitude', 'shopTags'  ]
        var dis =sequelize.literal("6371 * acos(cos(radians("+params.geoLat+")) * cos(radians(latitude)) * cos(radians("+params.geoLng+") - radians(longtitude)) + sin(radians("+params.geoLat+")) * sin(radians(latitude)))")
        atr.push([dis,'dis'])
        includeClause = 
        [
            {
                model: Product , as : 'product',
                attributes: ['name','description', 'category','productTags']
            },
            {  
                
                model: Shop, 
                //attributes: ['name','address','longtitude','latitude', 'shopTags'  ,[sequelize.literal("6371 * acos(cos(radians("+params.geoLat+")) * cos(radians(latitude)) * cos(radians("+params.geoLng+") - radians(longitude)) + sin(radians("+params.geoLat+")) * sin(radians(latitude)))"),'distance']],
                    attributes: atr,
                    where: 
                         sequelize.where(dis , '<' , params.geoDist)
            
            
            } ]
    
    }
    
    
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
    combinedList= []
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
    
    //-------------------------------DATE FIXING------------------------------
    date = new Date()
    date.setHours(2,0,0,0) //Greek Time Zone
    dateFrom = date
    dateTo = date
    dateinvalid = date
    if (((params.dateFrom) && (!params.dateTo)) || ((!params.dateFrom) && (params.dateTo)))
    {
        return res.status(400).json({
        message: "you must give both arguments"
    })}

    if (params.dateFrom && params.dateTo){
        dateFrom = new Date(req.query.dateFrom)
        console.log(params.dateFrom)

        dateFrom.setHours(2,0,0,0)
        dateTo = new Date (req.query.dateTo)
        dateTo.setHours(2,0,0,0)
        dateinvalid = new Date("30/15/2019")
        dateinvalid.setHours(2,0,0,0)
        console.log(dateTo)

    
    if (dateFrom==dateinvalid) {
        console.log(dateFrom)
        return res.status(401).json({
        message: "invalid date given , try again"
    })}
    if (dateTo==dateinvalid) {
        return res.status(402).json({
        message: "invalid date given , try again in the format month/day/year"
    })}
//lets confirm that date_from < date_to (eg: 1990-12-30 < 2000-9-4)
    if((dateFrom) > (dateTo)){
        return res.status(400).json({
            message: "date_from > date_to"
        })}
    }
  
    if (params.dateFrom && params.dateTo) {
        

        whereClause.date = {[Op.and]: {[Op.gte]: dateFrom, [Op.lte]: dateTo}}
    }
    //-----------------DISTANCE FIXING----------------------------------
    // var lat = parseFloat(req.query.geoLng);
    // var lng = parseFloat(req.query.geoLat);
    // var location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
    // var distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('location'), location);

    // console.log(location)
    // console.log(lat)
    // console.log(distance)



    if (params.dateFrom && params.dateTo){
    searchParams = {

        include: includeClause,
        offset: params.start, 
        limit: params.count,
        where: whereClause,
        raw: true,
        //include: [Shop] ,
        order: [[sort[0],sort[1]]]
    }}
    else {
        searchParams = {
        include: includeClause,
        offset: params.start, 
        limit: params.count,
        raw: true,
        //include: [Shop] ,

        where: whereClause,
        order: [[sort[0],sort[1]]]
    }}

    Price.findAll(searchParams).then(foundPrices => {
       var total =0 
       var results =[]
        foundPrices.forEach(found => {
            var obj1 = Object(found)
            var tags = Object.keys(obj1)
            var arr2 = tags.map(function (k) {
                return obj1[k];
            })
            //console.log(arr2[10])
            //var tags2 = tags.split(",") 
            //console.log(tags)
        if (arr2.length==18){
            var distance = arr2[17]
        }
        else {
            var distance = undefined
        }
        //console.log(String(found.date))
        var months = {
            'Jan' : '01',
            'Feb' : '02',
            'Mar' : '03',
            'Apr' : '04',
            'May' : '05',
            'Jun' : '06',
            'Jul' : '07',
            'Aug' : '08',
            'Sep' : '09',
            'Oct' : '10',
            'Nov' : '11',
            'Dec' : '12'
        }
        
        var finalDate = ""
        var dt = new Date(found.date)
        month = dt.getYear()
        console.log(month)
        var dateItems= String(found.date).split(" ")
        finalDate = finalDate+dateItems[3]+"-"+months[(dateItems[1])]+"-"+dateItems[2]
        console.log(dateItems)
            var obj= {
                date : finalDate,
                priceId: found.priceId,
                price: found.price.toFixed(3),
                productName :   arr2[8] ,
                productId :  found.productId,
                productTags :  arr2[11] ,
                shopId : found.shopId,
                shopName :  arr2[12] ,
                shopTags : arr2[16],
                shopAddress :  arr2[13],
                shopDist :distance
            }
            //console.log(found)
        total ++ 
        results.push(obj)
    })
    console.log(results)
    res.json({
        start: searchParams.offset,
        count: searchParams.limit,
        total: total,
        prices: results
    })
        //  var lista =[]
        //  var total = []
        //  foundPrices.forEach(foundPrice => {
        //     var product = Product.findOne({where: {
        //         productId: foundPrice.productId
        //     }})
        //     var shop = Shop.findOne({where: {
        //         shopId: foundPrice.shopId
        //     }})
        //     lista.push ({
        //         date: foundPrice.date,
        //         productName: product.name,
        //         productId:foundShop.add
        //         productTags:
        //         shopId
        //         shopName
        //         shopTags
    })
}

pricesApiController.reportAction = (req,res) => {
    var updated={}
    var id1 =req.params.id
    function  updateprice(id,res){
        Price.findOne({where: {priceId: id}}).then(found => {
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
        User.findOne({where: {userId: updated1.userId}}).then(found2 => {
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


    pricesApiController.createAction = (req, res) => {
        if (req.body.dateFrom) {
            var newitems ={
                price: req.body.price,
                date: req.body.dateFrom,
                reportCount: 0,
                shopId:req.body.shopId ,
                productId:req.body.productId ,
                userId: req.decoded.id
            }  
        }
        else {
            var newitems ={
                price: req.body.price,
                date: sequelize.fn('NOW'),
                reportCount: 0,
                shopId:req.body.shopId ,
                productId:req.body.productId ,
                userId: req.decoded.id
            }     
         }  
        if (typeof(shopId) === "string") {
            newitems.shopId = parseInt(newitems.shopId)
        }

        if (typeof(productId) === "string") {
            newitems.productId = parseInt(newitems.productId)
        }

        console.log(newitems)

        Price.create(newitems).then(newitem => {
            console.log(newitem.date)
            date = new Date(newitem.date)
            date.setHours(2,0,0,0)
            var prices = []
            prices.push({
                price:String(newitem.price),
                shopId:String(newitem.shopId),
                productId: String(newitem.productId)
            })
            res.json({
               // id: newitem.shopId,
               start:0,          
               count:1,
               total:1,
               prices: prices 
            })
        })
    }

module.exports = pricesApiController;