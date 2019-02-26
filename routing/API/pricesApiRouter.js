const router            = require('express').Router();
const pricesApiController   = require("../../controllers/API/pricesApiController"),
apiMiddlewares = require('../../middlewares/apiMiddlewares');

router.get('/', apiMiddlewares.checkRequestForPrices, pricesApiController.getAllAction)

router.get('/report/:id',pricesApiController.reportAction)
module.exports = router;