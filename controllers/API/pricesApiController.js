const pricesApiController = {}

pricesApiController.getAllAction = (req, res) => {
    res.send("HELLO PRICES GETALL!!")
}

pricesApiController.getOneAction = (req, res) => {
    res.send("HELLO PRICES GETONE!!")
}



module.exports = pricesApiController;