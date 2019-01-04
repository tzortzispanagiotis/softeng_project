const shopApiController = {}
const db= require('../../database/connect')

shopApiController.getAllAction = (req, res) => {
    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        status: req.query.status || 'ACTIVE',
        sort: req.query.sort || 'id|DESC'
    }
    var withdrawn= {} ; 

    if (params.status=='Active'){
        withdrawn:true}
    else if (params.status=='Withdrawn'){
        withdrawn:false
    }
    findallparam = {
        start:params.start ,
        count:params.count , 
        where:withdrawn
    }
    
    db.Shop.findAll(findallparam).then(foundShops => {
        var shops= [];
        var total = 0;
        foundShops.forEach(foundShop => {
            var tags = foundShop.tags.split(",")
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
        })
        res.json({
            start: findallparam.offset,
            count: findallparam.limit,
            total: total,
            shops: shops

        })
    })
    
}
shopApiController.getOneAction = (req, res) => {
    db.Shop.findOne({where: {
        ShopId: req.params.id
    }})
      .then(foundShop => {
        var tags = foundShop.tags.split(",")
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
    
    var newShops = req.params.x

    db.Shop.create(newShops).then(newShop => {
    var tags = newShop.tags.split(",")
        res.json({
            id: newShop.ShopId,
            name: newShop.name,
            address: newShop.address,
            longtitude: newShop.longtitude,
            latitude:newShop.latitude, 
            tags: tags,
            withdrawn: newShop.withdrawn
        })
    })
}


shopApiController.partialUpdateAction = (req,res) => {  
    var updatedShop ={}
    db.Shop.findOne({where: {ShopId: req.params.id}})
    .then(found => { //osa pedia den exoun oristei ek neou krataw ta palia
        if (req.body.name== null){
            updatedShop.name= found.name
        }
        else{
             updatedShop.name= req.body.name
            }
        if (req.body.address==null){
            updatedShop.address= found.address
        }
        else{
            updatedShop.address= req.body.address
           }
        if (req.body.longtitude==null){
            updatedShop.longtitude= found.longtitude
        }
        else{
            updatedShop.longtitude= req.body.longtitude
           }
        if (req.body.latitude==null){
            updatedShop.latitude= found.latitude
        }
        else{
            updatedShop.latitude= req.body.latitude
           }
        if (req.body.tags==null){
            updatedShop.tags= found.tags
        }
        else{
            updatedShop.tags= req.body.tags
           }
        found.update(updatedShop,{fields: ['name','address','longtitude','latitude','tags']}) //kanw update

    //db.Shop.findOne({where: {shopId: req.params.id}}) //ta emfanizw
    //.then(found => {
       // var tags = found.tags.split(",")
        res.json({
            id: req.params.id,
            name: updatedShop.name,
            address: updatedShop.address,
            longtitude: updatedShop.longtitude,
            latitude:updatedShop.latitude, 
            tags: updatedShop.tags,
            withdrawn: updatedShop.withdrawn

    
        })
    })

}


shopApiController.fullUpdate = (req,res) => {  
    var updatedShop = req.params.x
    db.Shop.findOne({where: {ShopId: req.params.id}})
    .then(found => {
       
        found.update(updatedShop,{fields: ['name','address','longtitude','latitude','tags']}) //kanw update
    
    //db.Shop.findOne({where: {shopId: req.params.id}}) //ta emfanizw
    //.then(found => {
       // var tags = found.tags.split(",")
        res.json({
            id: req.params.id,
            name: updatedShop.name,
            address: updatedShop.address,
            longtitude: updatedShop.longtitude,
            latitude:updatedShop.latitude, 
            tags: updatedShop.tags,
            withdrawn: updatedShop.withdrawn

    
        })
    })

} 
shopApiController.deleteAction = (req, res) => {
     var user = req.decoded.id
     console.log(user)
     db.Shops.findOne({where: {shopId:req.params.id}})
     .then(found => {
         user.findOne({where: {userId: user}})
         .then(found => {
             if (found.role == 'ADMIN') {
                 found.destroy()
                 res.json({message: 'OK'})
             }
             else {
                 found.withdrawn = true
                 res.json({message: 'OK'})
             }
         })
     })
}

module.exports = shopApiController;