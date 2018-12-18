const userApiController = {},
      sample            = require('../database/sampletable.js')

userApiController.getAllAction = (req, res) => {
    sample.findAll({attributes: ['username']}).then(found => {
        res.send(found)
    })
};

userApiController.getOneAction = (req, res) => {
    var filters = {
        where : {
            username: req.params.username
        },
        attributes: ['username']
    }
    sample.findOne(filters).then(found => {
        res.send(found);
    })
}

module.exports = userApiController