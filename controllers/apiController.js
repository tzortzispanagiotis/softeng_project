const indexController = {},
    sample            = require('../database/sampletable.js')

indexController.getAllAction = (req, res) => {
    sample.findAll().then(found => {
        res.send(found)
    })
};

indexController.getOneAction = (req, res) => {
    var filters = {
        where : {
            username: req.params.id
        }
    }
    sample.findOne(filters).then(found => {
        res.send(found)
    })
}

module.exports = indexController