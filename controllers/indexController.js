const indexController = {},
    sample            = require('../database/sampletable.js')

indexController.indexAction = (req, res) => {
    sample.findAll().then(found => {
        res.send(found)
    })
};

module.exports = indexController