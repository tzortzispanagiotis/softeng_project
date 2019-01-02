const productApiController = {},
      db                   = require('../../database/connect'),
      Product              = db.Product,
      user                 = db.User;

productApiController.getAllAction = (req, res) => {
    var whereClause = {}
    var searchParams = {}
    
    var params = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 20,
        status: req.query.status || 'ACTIVE',
        sort: req.query.sort || 'id|DESC'
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
        where: whereClause
    }

    Product.findAll(searchParams)
     .then(foundProducts => {
        var products = [];
        var total = 0;
        foundProducts.forEach(foundProduct => {
            var tags = foundProduct.tags.split(",")
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
        var tags = foundProduct.tags.split(",")
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

    Product.create(newProduct).then(newProd => {
    var tags = newProd.tags.split(",")
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

//for some reason fullUpdate works with 2 requests instead of 1!
productApiController.fullUpdateAction = (req,res) => {

    var updatedProduct = req.params.x
    Product.findOne({where: {productId: req.params.id}})
    .then(found => {
        found.update(updatedProduct,{fields: ['name','description','category','tags']})
    })

    Product.findOne({where: {productId: req.params.id}})
    .then(found => {
        var tags = found.tags.split(",")
        res.json({
            id: found.productId,
            name: found.name,
            description: found.description,
            category: found.category,
            tags: tags,
            withdrawn: found.withdrawn
        })
    })

}

productApiController.partialUpdateAction = (req,res) => {

}

productApiController.deleteAction = (req, res) => {
    // var user = req.decoded.id
    // console.log(user)
    // Product.findOne({where: {productId:req.params.id}})
    // .then(foundProduct => {
    //     user.findOne({where: {userId: user}})
    //     .then(found => {
    //         if (found.role == 'ADMIN') {
    //             foundProduct.destroy()
    //             res.json({message: 'OK'})
    //         }
    //         else {
    //             foundProduct.withdrawn = true
    //             res.json({message: 'OK'})
    //         }
    //     })
    // })
}

module.exports = productApiController;