const router            = require('express').Router();
const shopApiController   = require("../../controllers/API/shopApiController");

router.get('/', shopApiController.getAllAction)

router.get('/:id', shopApiController.getOneAction)

module.exports = router;