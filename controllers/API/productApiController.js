const productApiController = {},
      db                   = require('../../database/connect'),
      Product              = require('../../database/products'),
      user                 = require('../../database/user');

productApiController.getAllAction = (req, res) => {
    var whereClause = {}
    var searchParams = {}

    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        status: req.query.status || 'ACTIVE',
        productCategory: req.query.cat ? req.query.cat: null
    }


    var sort= {}
    sort[0] = 'productId'
    sort[1] = 'DESC'
 
    temp = req.query.sort
    if (temp){
        sort = temp.split('|')
        // if not ok, restore default
        if (sort[0] == 'id') sort[0] = 'productId'
        if ((sort[0] != 'id') || (sort[0] != 'name')) {
            sort[0] = 'productId'
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

    if(params.productCategory) {
      whereClause.category = params.productCategory;
    }

    console.log(whereClause);

    searchParams = {
        offset: params.start,
        limit: params.count,
        where: whereClause,
        order: [[sort[0],sort[1]]]
    }

    Product.findAll(searchParams)
     .then(foundProducts => {
       // console.log(foundProducts);
        var products = [];
        var total = 0;
        foundProducts.forEach(foundProduct => {
            var tags = foundProduct.productTags.split(",")
            products.push ({
                id: foundProduct.productId,
                name: foundProduct.name,
                description: foundProduct.description,
                category: foundProduct.category,
                tags: tags,
                withdrawn: foundProduct.withdrawn
            })
            total++;
        })
        res.json({
            start: searchParams.offset,
            count: searchParams.limit,
            total: total,
            products: products

        })
    })

}

productApiController.getOneAction = (req, res) => {
    Product.findOne({where: {
        productId: req.params.id
    }})
      .then(foundProduct => {
        var tags = foundProduct.productTags.split(",")
        res.json({
            id: foundProduct.productId,
            name: foundProduct.name,
            description: foundProduct.description,
            category: foundProduct.category,
            tags: tags,
            withdrawn: foundProduct.withdrawn
        })
    })
}

productApiController.createAction = (req, res) => {
    var newProduct = req.params.x
    
    if (Array.isArray(newProduct.productTags)) {
        var productTags = ""
        for (var i in newProduct.productTags) {
            productTags += newProduct.productTags[i]+","
        }
        newProduct.productTags = productTags.substring(0, productTags.length - 1)
    }
    var newPr = {
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        productTags: newProduct.productTags,
        withdrawn: newProduct.withdrawn
    }

    Product.create(newPr).then(newProd => {
    var tags = newProd.productTags.split(",")
        res.json({
            id: newProd.productId,
            name: newProd.name,
            description: newProd.description,
            category: newProduct.category,
            tags: tags,
            withdrawn: newProd.withdrawn
        })
    })
}

productApiController.fullUpdateAction = (req,res) => {
    var updatedProduct = req.params.x
    Product.findOne({where: {productId: req.params.id}})
    .then(found => {
        found.update(updatedProduct,{fields: ['name','description','category','productTags']})
        res.json({
            id: req.params.id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            category: updatedProduct.category,
            tags: updatedProduct.productTags,
            withdrawn: updatedProduct.withdrawn
        })
    })

}

productApiController.partialUpdateAction = (req,res) => {
    var updatedProduct = {}
    Product.findOne({where: {ProductId: req.params.id}})
    .then(found => { //osa pedia den exoun oristei ek neou krataw ta palia
        if (req.body.name == null){
            updatedProduct.name = found.name
        } else {
             updatedProduct.name= req.body.name
        }
        if (req.body.description==null){
            updatedProduct.description= found.description
        } else{
            updatedProduct.description= req.body.description
        }
        if (req.body.category==null){
            updatedProduct.category= found.category
        } else{
            updatedProduct.category= req.body.category
        }
        if (req.body.tags==null){
            updatedProduct.productTags= found.productTags
        } else{
            updatedProduct.productTags= req.body.tags
        }
        found.update(updatedProduct,{fields: ['name','description','category','productTags','withdrawn']}) //kanw update
        res.json({
            id: req.params.id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            category: updatedProduct.category,
            tags: updatedProduct.productTags,
            withdrawn: updatedProduct.withdrawn
        })
    })
}

productApiController.deleteAction = (req, res) => {
    var User = req.decoded.id
    console.log(user)
    Product.findOne({where: {productId:req.params.id}})
    .then(foundProduct => {
        user.findOne({where: {userId: User}})
        .then(found => {
            if (found.role == 'ADMIN') {
                console.log(found.role)
                foundProduct.destroy()
                res.json({message: 'OK-deleted product'})
            }
            else {
                var updatedProduct = {}
                updatedProduct.withdrawn = true
                updatedProduct.name = foundProduct.name
                updatedProduct.description = foundProduct.description
                updatedProduct.category = foundProduct.category
                updatedProduct.tags = foundProduct.productTags
                foundProduct.update(updatedProduct,{fields: ['name','description','category','productTags','withdrawn']}) //kanw update
                res.json({message: 'OK-updated prod'})
            }
        })
    })
}

module.exports = productApiController;
