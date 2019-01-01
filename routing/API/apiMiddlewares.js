var apiBadFormatRequest = function (req,res, next) {
    var format = req.query.format

    if (format == 'xml') {
        res.status(400).json({error: 'Bad Request'})
    }
    else {
        next();
    }
}

var apiMiddlewares = {
    apiBadFormatRequest: apiBadFormatRequest
}

module.exports = apiMiddlewares;