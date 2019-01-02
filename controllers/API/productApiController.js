const productApiController = {},
      db                   = require('../../database/connect'),
      Product              = db.Product;

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
            tags: tags,
            withdrawn: foundProduct.withdrawn
        })
    })
}

productApiController.createAction = (req, res) => {
    if (req.body.name == null || req.body.description == null || req.body.category == null || req.body.tags ==null) {
        res.status(400).json({error: 'Bad Request'})
    }

    var newProduct = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        withdrawn: false
    }

    Product.create(newProduct).then(newProd => {
    var tags = newProd.tags.split(",")
        res.json({
            id: newProd.productId,
            name: newProd.name,
            description: newProd.description,
            tags: tags,
            withdrawn: newProd.withdrawn
        })
    })
}


module.exports = productApiController;