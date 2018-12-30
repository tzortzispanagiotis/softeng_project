const productApiController = {};

productApiController.getAllAction = (req, res) => {
    res.send("HELLO PRODUCT GETALL!!")
}

productApiController.getOneAction = (req, res) => {
    res.send("HELLO PRODUCT GETONE!!")
}


module.exports = productApiController;