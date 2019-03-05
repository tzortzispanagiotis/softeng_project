const shopApiController = {},
      db                = require('../../database/connect'),
      Shop              = require('../../database/shops'),
      User              = require('../../database/user'),
      distance          = require('./diastance');

shopApiController.getAllAction = (req, res) => {
    var whereClause = {}
    var searchParams = {}

    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        status: req.query.status || 'ACTIVE',
        geoDist: parseInt(req.query.geoDist) || null,
        geoLng :parseFloat(req.query.geoLng) || null,
        geoLat : parseFloat(req.query.geoLat) || null, 
    }
    console.log(params)
    var sort= {}
    sort[0] = 'shopId'
    sort[1] = 'DESC'

    temp = req.query.sort
    if (temp){       
        sort = temp.split('|')
        // if not ok, restore default
        if (sort[0] == 'id') sort[0] = 'shopId'
        if ((sort[0] != 'id') && (sort[0] != 'name')) {
            sort[0] = 'shopId'
        }
        if (sort[1] != 'ASC') {
            sort[1] = 'DESC'
        }
    }  

    if (params.status == 'ACTIVE') {
        whereClause = {
            withdrawn: false
        }
    }
    else if (params.status == 'WITHDRAWN') {
        whereClause = {
            withdrawn: true
        }
    }


    searchParams = {
        offset: params.start, 
        limit: params.count,
        where: whereClause,
        order: [[sort[0],sort[1]]]
    }

    Shop.findAll(searchParams)
    .then(foundShops => {
        var shops= [];
        var total = 0;
        foundShops.forEach(foundShop => {
            if (req.query.geoDist) {
                var dist = distance.distance(foundShop.latitude, foundShop.longtitude, params.geoLat,  params.geoLng, 'K')
                if (dist <= params.geoDist) {
                    var tags = foundShop.shopTags.split(",")
                    shops.push ({
                        id: foundShop.shopId,
                        name: foundShop.name,
                        address:foundShop.address,
                        lng: foundShop.longtitude,
                        lat: foundShop.latitude,
                        tags: tags,
                        withdrawn: foundShop.withdrawn
                    })
                    total++;
                }
            }
            else {
            var tags = foundShop.shopTags.split(",")
            shops.push ({
                id: foundShop.shopId,
                name: foundShop.name,
                address:foundShop.address,
                lng: foundShop.longtitude,
                lat: foundShop.latitude,
                tags: tags,
                withdrawn: foundShop.withdrawn
            })
            total++;
        }})
        res.json({
            start: searchParams.offset,
            count: searchParams.limit,
            total: total,
            shops: shops
        })
    })
}

shopApiController.getOneAction = (req, res) => {
    Shop.findOne({where: {
        shopId: req.params.id
    }})
      .then(foundShop => {
        var tags = foundShop.shopTags.split(",")
        res.json({
                id: foundShop.shopId,
                name: foundShop.name,
                address:foundShop.address,
                lng: foundShop.longtitude,
                lat: foundShop.latitude,
                tags: tags,
                withdrawn: foundShop.withdrawn
        })
    })
}

shopApiController.createAction = (req, res) => {
    var newShop = req.params.x

    if (Array.isArray(newShop.shopTags)) {
        var shopTags = ""
        for (var i in newShop.shopTags) {
            shopTags += newShop.shopTags[i]+","
        }
        newShop.shopTags = shopTags.substring(0, shopTags.length - 1)
    }
    var newSh = {
        name: newShop.name,
        address: newShop.address,
        longtitude: newShop.longtitude,
        latitude: newShop.latitude,
        shopTags: newShop.shopTags,
        withdrawn: newShop.withdrawn
    }
    Shop.create(newSh).then(newShop => {
    var tags = newShop.shopTags.split(",")
        res.json({
            id: newShop.shopId,
            name: newShop.name,
            address: newShop.address,
            lng: newShop.longtitude,
            lat:newShop.latitude, 
            tags: tags,
            withdrawn: newShop.withdrawn
        })
    })
}

shopApiController.partialUpdateAction = (req,res) => {  
    var updatedShop ={}
    Shop.findOne({where: {shopId: req.params.id}})
    .then(found => { //osa pedia den exoun oristei ek neou krataw ta palia
        if (req.body.name== null){
            updatedShop.name= found.name
        } else {
             updatedShop.name= req.body.name
        }
        if (req.body.address==null){
            updatedShop.address= found.address
        } else {
            updatedShop.address= req.body.address
        }
        if (req.body.longtitude==null){
            updatedShop.longtitude= found.longtitude
        } else {
            updatedShop.longtitude= req.body.longtitude
        }
        if (req.body.latitude==null){
            updatedShop.latitude= found.latitude
        } else {
            updatedShop.latitude= req.body.latitude
        }
        if (req.body.tags==null){
            updatedShop.shopTags= found.shopTags
        } else { 
            updatedShop.shopTags= req.body.tags
        }
        found.update(updatedShop,{fields: ['name','address','longtitude','latitude','shopTags']}) //kanw update
        res.json({
            id: req.params.id,
            name: updatedShop.name,
            address: updatedShop.address,
            longtitude: updatedShop.longtitude,
            latitude:updatedShop.latitude, 
            tags: updatedShop.shopTags,
            withdrawn: updatedShop.withdrawn    
        })
    })
}


shopApiController.fullUpdate = (req,res) => {  
    var updatedShop = req.params.x
    Shop.findOne({where: {shopId: req.params.id}})
    .then(found => { 
        found.update(updatedShop,{fields: ['name','address','longtitude','latitude','shopTags']}) //kanw update
        res.json({
            id: req.params.id,
            name: updatedShop.name,
            address: updatedShop.address,
            longtitude: updatedShop.longtitude,
            latitude:updatedShop.latitude, 
            tags: updatedShop.shopTags,
            withdrawn: updatedShop.withdrawn
        })
    })
} 

shopApiController.deleteAction = (req, res) => {
    var User = req.decoded.id
    Shop.findOne({where: {shopId:req.params.id}})
    .then(foundShop => {
        User.findOne({where: {userId: User}})
        .then(found => {
            if (found.role == 'ADMIN') {
                console.log(found.role)
                foundShop.destroy()
                res.json({message: 'OK'})
            }
            else {
                var updatedShop = {}
                updatedShop.withdrawn = true
                updatedShop.name = foundShop.name
                updatedShop.description = foundShop.description
                updatedShop.category = foundShop.category
                updatedShop.shopTags = foundShop.shopTags
                foundShop.update(updatedShop,{fields: ['name','address','longtitude','latitude','shopTags', 'withdrawn']}) //kanw update
                res.json({message: 'OK'})
            }
        })
    })
}

module.exports = shopApiController;