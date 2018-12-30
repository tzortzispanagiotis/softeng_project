const router            = require('express').Router();
const pricesApiController   = require("../../controllers/API/pricesApiController");

router.get('/', pricesApiController.getAllAction)

router.get('/:id', pricesApiController.getOneAction)

module.exports = router;