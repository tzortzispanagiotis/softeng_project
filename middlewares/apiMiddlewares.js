var apiMiddlewares = {}

apiMiddlewares.apiBadFormatRequest = (req,res, next) => {
    var format = req.query.format

    if (format != null && format != 'json' ) {
        res.status(400).json({error: 'Bad Request'})
    }
    else {
        next();
    }
}

apiMiddlewares.checkRequestForProduct = (req,res, next) => {
    if (req.body.name == null || req.body.description == null || req.body.category == null || req.body.tags ==null) {
        res.status(400).json({error: 'Bad Request'})
    }
    else {
        var x = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            tags: req.body.tags,
            withdrawn: false
        }
        req.params.x = x
        next();
    }
}

module.exports = apiMiddlewares