const router            = require('express').Router();
const pricesApiController   = require("../../controllers/API/pricesApiController"),
apiMiddlewares = require('../../middlewares/apiMiddlewares');

router.get('/', apiMiddlewares.checkRequestForPrices, pricesApiController.getAllAction)
router.post('/', apiMiddlewares.checkToken, apiMiddlewares.checkRequestForPricescreate,pricesApiController.createAction )
router.get('/report/:id',pricesApiController.reportAction)
module.exports = router;