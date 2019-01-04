var apiMiddlewares = {}
const authMiddlewares = require("../policies/authenticationPolicy")

apiMiddlewares.login = authMiddlewares.login
apiMiddlewares.checkToken = authMiddlewares.checkToken

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
        res.status(400).json({error: 'Bad Request!!'})
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
apiMiddlewares.checkRequestForShop = (req,res, next) => {
    if (req.body.name == null ) {
        res.status(400).json({error: 'Bad Request02'})
    }
    if (req.body.address == null ) {
        res.status(400).json({error: 'Bad Request23'})
    }
    if ( req.body.longtitude == null ) {
        res.status(400).json({error: 'Bad Request34'})
    }
    if ( req.body.latitude  ==null) {
        res.status(400).json({error: 'Bad Request56'})
    }
    if (  req.body.tags ==null) {
        res.status(400).json({error: 'Bad Request'})
    }
    else {
        var x = {
            name: req.body.name,
            address: req.body.address,
            longtitude: req.body.longtitude,
            latitude: req.body.latitude,
            tags: req.body.tags,
            withdrawn: false
        }
        req.params.x = x
        next();
    }
}

module.exports = apiMiddlewares