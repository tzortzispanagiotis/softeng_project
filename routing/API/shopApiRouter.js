const router            = require('express').Router();
const shopApiController   = require("../../controllers/API/shopApiController"),
      apiMiddlewares = require('../../middlewares/apiMiddlewares');
      
router.get('/', apiMiddlewares.checkRequestForShopGetAll, shopApiController.getAllAction) //CHECKD

router.get('/:id', shopApiController.getOneAction) //CHECKED

router.post('/', apiMiddlewares.checkToken, apiMiddlewares.checkRequestForShop, shopApiController.createAction) //CHECKED


router.put('/:id', apiMiddlewares.checkToken, apiMiddlewares.checkRequestForShop, shopApiController.fullUpdate) //checked

router.patch('/:id', apiMiddlewares.checkToken, shopApiController.partialUpdateAction) //checked

router.delete('/:id', apiMiddlewares.checkToken, shopApiController.deleteAction) //na to dw 


module.exports = router;