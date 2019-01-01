const userApiController = {},
      database            = require('../../database/connect');

var User = database.User;

userApiController.getAllAction = (req, res) => {
    User.findAll({attributes: ['username']}).then(found => {
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
    User.findOne(filters).then(found => {
        res.send(found);
    })
}

module.exports = userApiController;