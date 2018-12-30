const router            = require('express').Router();
const productApiController   = require("../../controllers/API/productApiController");

router.get('/', productApiController.getAllAction)

router.get('/:id', productApiController.getOneAction)

module.exports = router;