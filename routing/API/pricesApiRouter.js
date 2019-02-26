const router            = require('express').Router();
const pricesApiController   = require("../../controllers/API/pricesApiController");

router.get('/', pricesApiController.getAllAction)

router.get('/:id', pricesApiController.getOneAction)

router.get('/report/:id',pricesApiController.reportAction)
module.exports = router;