const shopApiController = {}

shopApiController.getAllAction = (req, res) => {
    res.send("HELLO SHOP GETALL!!")
}

shopApiController.getOneAction = (req, res) => {
    res.send("HELLO SHOP GETONE!!")
}

module.exports = shopApiController;
