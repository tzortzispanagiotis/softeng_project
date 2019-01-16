const router            = require('express').Router();
const pricesApiController   = require("../../controllers/API/pricesApiController"),
apiMiddlewares = require('../../middlewares/apiMiddlewares');

router.get('/', pricesApiController.getAllAction)

//router.get('/:id', pricesApiController.getOneAction)
//no delete action is valid , u can deelete a price by deleting the product and shop 
//to which it refers
//u can only partial update prices and change the date and/or price
router.patch('/', apiMiddlewares.checkToken, pricesApiController.partialUpdateAction)
module.exports = router;