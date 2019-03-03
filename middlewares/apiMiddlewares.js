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
    if (req.body.name == null || 
        req.body.description == null || 
        req.body.category == null || 
        req.body.tags == null) {
        res.status(400).json({error: 'Bad Request'})
    }
    else {
        var x = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            productTags: req.body.tags,
            withdrawn: false
        }
        req.params.x = x
        next();
    }
}

apiMiddlewares.checkRequestForShop = (req,res, next) => {
    if ((req.body.name == null ) || 
        (req.body.address == null ) || 
        (req.body.longtitude == null ) || 
        (req.body.latitude  ==null) || 
        (req.body.tags ==null)) {
        res.status(400).json({error: 'Bad Request!!'})
    }
    else {  
        var x = {
            name: req.body.name,
            address: req.body.address,
            longtitude: req.body.longtitude,
            latitude: req.body.latitude,
            shopTags: req.body.tags,
            withdrawn: false
        }
        req.params.x = x
        next();
    }
}

apiMiddlewares.checkRequestForShopGetAll = (req, res, next) => {
    if (((req.query.geoDist == null) &&
        (req.query.geoLng == null) &&
        (req.query.geoLat == null)) ||
        ((req.query.geoDist != null) &&
        (req.query.geoLng != null) &&
        (req.query.geoLat != null))) {
            next();
    }
    else {
        res.status(400).json({error: 'Bad Request!!'})
    }
}

apiMiddlewares.checkRequestForPrices = (req,res, next) => {
    if ((req.query.geoDist == null &&
        req.query.geoLng == null &&
        req.query.geoLat == null) ||
        (req.query.geoDist != null &&
        req.query.geoLng != null &&
        req.query.geoLat != null)) 
    {
        if ((req.query.dateFrom == null &&
            req.query.dateTo == null) ||
            (req.query.dateFrom != null &&
                req.query.dateTo != null))
        {
            next()
        }
        else {
            res.status(400).json({error: 'Λάθως ερώτημα. Χρησιμοποιήστε ή και τα 2 πεδία dateFrom,dateTo ή κανένα'})
        }
    }    
    else {
        res.status(400).json({error: 'Λάθος ερώτημα. Χρησιμοποιήστε ή και τα 3 πεδία geoDist, geoLng, geoLat ή κανένα'})
    }
}

module.exports = apiMiddlewares